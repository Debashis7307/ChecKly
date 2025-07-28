import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Search,
  Zap,
  Shield,
  BarChart3,
  Award,
  TrendingUp,
  Target,
} from "lucide-react";

const CategoryCard = ({ categoryName, category, index }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
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

  return (
    <motion.div
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
  );
};

export default CategoryCard;