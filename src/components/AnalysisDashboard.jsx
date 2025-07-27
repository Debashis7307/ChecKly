import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Download,
  Share2,
  TrendingUp,
  Shield,
  Zap,
  Search,
  Clock,
  BarChart3,
  Target,
  Award,
  Info,
  ExternalLink,
} from "lucide-react";

const AnalysisDashboard = ({ results, onBack, onNewAnalysis }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Poor";
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <Award className="w-5 h-5" />;
    if (score >= 75) return <TrendingUp className="w-5 h-5" />;
    if (score >= 60) return <Target className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pass":
        return "border-emerald-200 bg-emerald-50 hover:bg-emerald-100";
      case "fail":
        return "border-red-200 bg-red-50 hover:bg-red-100";
      case "warning":
        return "border-amber-200 bg-amber-50 hover:bg-amber-100";
      default:
        return "border-gray-200 bg-gray-50 hover:bg-gray-100";
    }
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "SEO":
        return <Search className="w-6 h-6" />;
      case "PERFORMANCE":
        return <Zap className="w-6 h-6" />;
      case "SECURITY":
        return <Shield className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const downloadReport = () => {
    const reportData = {
      url: results.url,
      timestamp: results.timestamp,
      overallScore: results.overallScore,
      categories: results.categories,
      summary: {
        totalChecks: results.totalChecks,
        passedChecks: results.passedChecks,
        failedChecks: results.totalChecks - results.passedChecks,
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `checkly-analysis-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (results.overallScore < 90) {
      recommendations.push(
        "Focus on improving failed checks to boost your overall score"
      );
    }
    if (results.overallScore < 75) {
      recommendations.push(
        "Prioritize security and SEO improvements for better performance"
      );
    }

    // Add specific recommendations based on failed checks
    Object.entries(results.categories).forEach(([categoryName, category]) => {
      const failedChecks = category.checks.filter(
        (check) => check.status === "fail"
      );
      if (failedChecks.length > 0) {
        recommendations.push(
          `Address ${
            failedChecks.length
          } failed ${categoryName.toLowerCase()} checks`
        );
      }
    });

    return recommendations;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-t border-gray-200 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/80 rounded-full transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Analysis Report
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive analysis of{" "}
            <span className="font-semibold text-blue-600">{results.url}</span>
          </p>

          {/* Overall Score Card */}
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white rounded-2xl shadow-xl border-2 border-gray-100">
            <div
              className={`p-3 rounded-full ${
                getScoreColor(results.overallScore).split(" ")[0]
              } ${getScoreColor(results.overallScore).split(" ")[1]}`}
            >
              {getScoreIcon(results.overallScore)}
            </div>
            <div className="text-left">
              <div
                className={`text-3xl font-bold ${
                  getScoreColor(results.overallScore).split(" ")[0]
                }`}
              >
                {results.overallScore}%
              </div>
              <div className="text-sm text-gray-600">
                {getScoreLabel(results.overallScore)} • {results.passedChecks}/
                {results.totalChecks} checks passed
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-12"
        >
          <button
            onClick={downloadReport}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          <button
            onClick={onNewAnalysis}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <BarChart3 className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </motion.div>

        {/* Categories Grid - Equal Height with Scroll */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(results.categories).map(
            ([categoryName, category], index) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-[600px] flex flex-col"
              >
                {/* Category Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        getScoreColor(category.score).split(" ")[1]
                      }`}
                    >
                      {getCategoryIcon(categoryName)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {categoryName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {
                          category.checks.filter(
                            (check) => check.status === "pass"
                          ).length
                        }{" "}
                        of {category.checks.length} checks passed
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(
                      category.score
                    )}`}
                  >
                    {getScoreIcon(category.score)}
                    <span>{category.score}%</span>
                  </div>
                </div>

                {/* Scrollable Checks Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {category.checks.map((check, checkIndex) => (
                    <motion.div
                      key={check.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + checkIndex * 0.05 }}
                      className={`border rounded-xl p-4 transition-all duration-300 ${getStatusColor(
                        check.status
                      )}`}
                    >
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(check.status)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                            {check.name}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                            {check.description}
                          </p>
                          <div className="space-y-1">
                            <p
                              className={`text-xs font-medium ${
                                check.status === "pass"
                                  ? "text-emerald-700"
                                  : "text-red-700"
                              }`}
                            >
                              {check.message}
                            </p>
                            {check.status === "fail" && (
                              <div className="bg-white/50 rounded-lg p-2 border border-gray-200">
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  {check.details}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Detailed Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <span>Analysis Summary</span>
            </h3>
            <p className="text-gray-600 mt-1">
              Detailed insights and recommendations for improving your website
            </p>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Key Recommendations</span>
                </h4>
                <div className="space-y-3">
                  {getRecommendations().map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Performance Statistics</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.overallScore}%
                    </div>
                    <div className="text-sm text-blue-700">Overall Score</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600">
                      {results.passedChecks}
                    </div>
                    <div className="text-sm text-emerald-700">
                      Passed Checks
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="text-2xl font-bold text-red-600">
                      {results.totalChecks - results.passedChecks}
                    </div>
                    <div className="text-sm text-red-700">Failed Checks</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="text-2xl font-bold text-amber-600">
                      {results.totalChecks}
                    </div>
                    <div className="text-sm text-amber-700">Total Checks</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Next Steps</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Review and fix failed checks
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Implement suggested improvements
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Run another analysis after changes
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Monitor performance regularly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AnalysisDashboard;
