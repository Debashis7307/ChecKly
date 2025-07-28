import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased timeout for analysis
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // For CORS
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.baseURL}${config.url}`,
    );
    console.log("Request payload:", config.data);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });

    if (error.response?.status === 404) {
      throw new Error(
        "API endpoint not found. Please check if the server is running.",
      );
    } else if (error.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      throw new Error(
        "Request timeout. The analysis is taking longer than expected.",
      );
    } else if (!error.response) {
      throw new Error(
        "Network error. Please check if the backend server is running on port 8080.",
      );
    } else if (error.response?.status === 0) {
      throw new Error("CORS error. Please check server configuration.");
    }

    throw new Error(
      error.response?.data?.error || error.message || "Unknown error occurred",
    );
  },
);

class WebsiteAnalysisService {
  async analyzeWebsite(url) {
    try {
      const normalizedUrl = this.normalizeUrl(url);
      console.log("Analyzing website:", normalizedUrl);

      const response = await api.post("/check", {
        url: normalizedUrl,
      });

      const checkData = response.data;
      console.log("Received check data:", checkData);

      if (!checkData) {
        throw new Error("No data received from server");
      }

      return this.formatAnalysisResults(checkData);
    } catch (error) {
      console.error("Analysis failed:", error);
      if (error.message && error.message.includes("Buffer size mismatch")) {
        throw new Error("Data transfer error occurred. Please try again.");
      }
      throw error; // Re-throw the error with original message
    }
  }

  async getCheckResult(checkId) {
    try {
      const response = await api.get(`/check/${checkId}`);
      return this.formatAnalysisResults(response.data);
    } catch (error) {
      console.error("Failed to get check result:", error);
      throw new Error(`Failed to retrieve check result: ${error.message}`);
    }
  }

  async getRecommendations(checkId, focusAreas = []) {
    try {
      const response = await api.post("/recommend", {
        check_id: checkId,
        focus: focusAreas,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      throw new Error(`Failed to get recommendations: ${error.message}`);
    }
  }

  formatAnalysisResults(checkData) {
    console.log("Formatting analysis results:", checkData);

    if (!checkData) {
      throw new Error("No check data provided");
    }

    // Handle case where analysis might still be in progress
    if (checkData.status === "pending" || checkData.status === "running") {
      throw new Error(
        "Analysis is still in progress. Please try again in a moment.",
      );
    }

    if (!checkData.report) {
      throw new Error("No report data available. Analysis may have failed.");
    }

    const report = checkData.report;

    // Use the REAL overall score from the backend API
    const results = {
      id: checkData.id,
      url: checkData.url,
      timestamp: checkData.created_at || report.timestamp,
      status: checkData.status,
      categories: {},
      overallScore: report.overall_score || 0, // This is the REAL score from backend
      totalChecks: report.results?.length || 0,
      passedChecks: 0,
    };

    if (report.results && Array.isArray(report.results)) {
      const categoryMap = {
        SEO: [
          "robots",
          "sitemap",
          "title",
          "meta description",
          "open graph",
          "twitter",
          "canonical",
        ],
        //        'PERFORMANCE': ['image', 'performance', 'speed', 'cache', 'compression'],
        SECURITY: [
          "hsts",
          "csp",
          "x-frame",
          "x-content",
          "referrer",
          "xss",
          "ssl",
          "https",
          "security",
        ],
      };

      // Initialize categories
      Object.keys(categoryMap).forEach((categoryName) => {
        results.categories[categoryName] = {
          checks: [],
          score: 0,
          totalChecks: 0,
          passedChecks: 0,
        };
      });

      // Process each check result and count passes/fails per category
      report.results.forEach((result) => {
        if (result.status === "pass") {
          results.passedChecks++;
        }

        const category = this.getCategoryForCheck(result.name, categoryMap);
        if (category && results.categories[category]) {
          results.categories[category].checks.push({
            name: result.name,
            description: result.details || result.message,
            status: result.status,
            message: result.message,
            details: result.details,
            timestamp: result.timestamp,
          });

          results.categories[category].totalChecks++;
          if (result.status === "pass") {
            results.categories[category].passedChecks++;
          }
        }
      });

      // Calculate category scores based on actual pass/fail ratio (0-100%)
      Object.keys(results.categories).forEach((categoryName) => {
        const category = results.categories[categoryName];
        if (category.totalChecks > 0) {
          // Real category score based on percentage of passed checks
          category.score = Math.round(
            (category.passedChecks / category.totalChecks) * 100,
          );
        } else {
          category.score = 0;
        }
      });
    }

    console.log("Formatted results with REAL scores:", results);
    console.log("Overall score from backend:", report.overall_score);
    return results;
  }

  getCategoryForCheck(checkName, categoryMap) {
    const lowerCheckName = checkName.toLowerCase();

    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (
        keywords.some((keyword) =>
          lowerCheckName.includes(keyword.toLowerCase()),
        )
      ) {
        return category;
      }
    }

    // Default to SEO if no match found
    return "SEO";
  }

  normalizeUrl(url) {
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL provided");
    }

    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      // Validate URL format
      new URL(normalizedUrl);
      return normalizedUrl;
    } catch (error) {
      throw new Error("Invalid URL format");
    }
  }
}

export default new WebsiteAnalysisService();

