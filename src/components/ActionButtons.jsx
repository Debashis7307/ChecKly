import React from "react";
import { motion } from "framer-motion";
import { Download, BarChart3 } from "lucide-react";

const ActionButtons = ({ results, onNewAnalysis }) => {
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

  return (
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
  );
};

export default ActionButtons;