import React from "react";
import { motion } from "framer-motion";
import AnalysisHeader from "./AnalysisHeader";
import ActionButtons from "./ActionButtons";
import CategoryGrid from "./CategoryGrid";
import SummaryStats from "./SummaryStats";
import AIRecommendations from "./AIRecommendations";

const AnalysisDashboard = ({
  results,
  onBack,
  onNewAnalysis,
  user,
  onSignInRequired,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 bg-gradient-to-br from-black via-gray-900 to-black border-t border-gray-800 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnalysisHeader results={results} onBack={onBack} />
        <ActionButtons results={results} onNewAnalysis={onNewAnalysis} />
        <CategoryGrid results={results} />
        <SummaryStats results={results} />
        <div className="mt-8">
          <AIRecommendations
            results={results}
            user={user}
            onSignInRequired={onSignInRequired}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AnalysisDashboard;
