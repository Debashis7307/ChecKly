import React, { useState } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Brain,
  Lightbulb,
  RefreshCw,
  ExternalLink,
  Search,
  Zap,
  Shield,
  BarChart3,
  LogIn,
} from "lucide-react";
import websiteAnalysisService from "../services/websiteAnalysis";

const AIRecommendations = ({ results, user, onSignInRequired }) => {
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const loadAiRecommendations = async () => {
    if (!results?.id) return;

    // Check if user is signed in
    if (!user) {
      onSignInRequired();
      return;
    }

    setLoadingRecommendations(true);
    try {
      const recommendations = await websiteAnalysisService.getRecommendations(
        results.id
      );
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error("Failed to load AI recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
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

  if (!results?.id) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden mb-12"
    >
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                AI-Powered Recommendations
              </h3>
              <p className="text-gray-300 mt-1">
                Intelligent insights powered by advanced AI analysis
              </p>
            </div>
          </div>
          <button
            onClick={loadAiRecommendations}
            disabled={loadingRecommendations}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                loadingRecommendations ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {loadingRecommendations ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48">
                <DotLottieReact
                  src="https://lottie.host/bff0c4ca-7943-49eb-a48a-e5a545550fd9/OCG6qyPEtk.lottie"
                  loop
                  autoplay
                />
              </div>
              <p className="text-gray-300">Generating AI recommendations...</p>
            </div>
          </div>
        ) : aiRecommendations ? (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
              <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-400" />
                <span>Executive Summary</span>
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {aiRecommendations.summary}
              </p>
            </div>

            {/* Recommendations by Category */}
            <div className="grid lg:grid-cols-2 gap-6">
              {aiRecommendations.recommendations?.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-600 bg-gray-700/30 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-white capitalize flex items-center space-x-2">
                      {getCategoryIcon(category.category)}
                      <span>{category.category}</span>
                    </h5>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        category.priority === "high"
                          ? "bg-red-900/30 text-red-300 border border-red-500/30"
                          : category.priority === "medium"
                          ? "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                          : "bg-green-900/30 text-green-300 border border-green-500/30"
                      }`}
                    >
                      {category.priority} priority
                    </span>
                  </div>

                  {/* Issues */}
                  {category.issues?.length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-sm font-medium text-gray-300 mb-2">
                        Issues Found:
                      </h6>
                      <div className="space-y-2">
                        {category.issues.map((issue, issueIndex) => (
                          <div
                            key={issueIndex}
                            className="bg-red-900/20 rounded-lg p-3 border border-red-500/30"
                          >
                            <p className="text-sm font-medium text-red-300">
                              {issue.issue}
                            </p>
                            <p className="text-xs text-red-400 mt-1">
                              {issue.impact}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Status: {issue.current_status}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Improvements */}
                  {category.improvements?.length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-sm font-medium text-gray-300 mb-2">
                        Recommended Actions:
                      </h6>
                      <div className="space-y-2">
                        {category.improvements.map(
                          (improvement, improvementIndex) => (
                            <div
                              key={improvementIndex}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {improvement}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {category.resources?.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-300 mb-2">
                        Helpful Resources:
                      </h6>
                      <div className="space-y-1">
                        {category.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>{resource}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <Brain className="w-16 h-16 text-gray-500 mx-auto" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              AI Recommendations Available
            </h4>
            <p className="text-gray-300 mb-4">
              Get personalized insights and actionable recommendations powered
              by AI
            </p>
            {user ? (
              <button
                onClick={loadAiRecommendations}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Brain className="w-5 h-5" />
                <span>Generate AI Recommendations</span>
              </button>
            ) : (
              <button
                onClick={loadAiRecommendations}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In to Generate AI Recommendations</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
