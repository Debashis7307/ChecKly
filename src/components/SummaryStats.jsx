import React from "react";
import { motion } from "framer-motion";
import { Clock, Target, BarChart3, TrendingUp } from "lucide-react";

const SummaryStats = ({ results }) => {
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
  );
};

export default SummaryStats;