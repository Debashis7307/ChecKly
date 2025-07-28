import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Award, TrendingUp, Target, AlertCircle } from "lucide-react";

const AnalysisHeader = ({ results, onBack }) => {
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

  return (
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
  );
};

export default AnalysisHeader;