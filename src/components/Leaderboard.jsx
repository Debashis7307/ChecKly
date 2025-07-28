import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Globe, X, Medal, TrendingUp } from "lucide-react";
import websiteAnalysisService from "../services/websiteAnalysis";

const rankColors = [
  "bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 border-yellow-300", // 1st
  "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900 border-gray-300", // 2nd
  "bg-gradient-to-r from-orange-400 to-orange-200 text-orange-900 border-orange-300", // 3rd
];

const getRankIcon = (rank) => {
  if (rank === 0) return <Medal className="w-5 h-5 text-yellow-600" />;
  if (rank === 1) return <Medal className="w-5 h-5 text-gray-600" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-orange-600" />;
  return <TrendingUp className="w-5 h-5 text-blue-600" />;
};

const Leaderboard = ({ isOpen, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await websiteAnalysisService.getLeaderboard();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      setError(err.message || "Failed to load leaderboard data");
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">
            Top 10 websites with the best analysis scores
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading leaderboard...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <Globe className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={fetchLeaderboard}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No leaderboard data available yet.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Be the first to analyze a website!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.slice(0, 10).map((entry, idx) => (
                <motion.div
                  key={entry.url + entry.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    idx < 3
                      ? rankColors[idx] + " shadow-lg transform hover:scale-105"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getRankIcon(idx)}
                      <span
                        className={`text-xl font-bold ${
                          idx < 3 ? "text-white" : "text-gray-700"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </div>

                    <img
                      src={entry.favicon}
                      alt="favicon"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-white"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />

                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium hover:underline break-all flex-1 min-w-0 ${
                        idx < 3 ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {entry.domain}
                    </a>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          idx < 3 ? "text-white" : "text-blue-600"
                        }`}
                      >
                        {entry.overallScore}
                      </div>
                      <div
                        className={`text-xs ${
                          idx < 3 ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        Score
                      </div>
                    </div>
                    <div
                      className={`text-xs ${
                        idx < 3 ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {entry.formattedDate}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Updated in real-time</span>
            <span>Total entries: {leaderboard.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
