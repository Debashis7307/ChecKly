import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Globe, X, Medal, TrendingUp, ChevronDown } from "lucide-react";
import websiteAnalysisService from "../services/websiteAnalysis";

const rankColors = [
  "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white border-yellow-400", // 1st
  "bg-gradient-to-r from-purple-600 to-purple-500 text-white border-purple-400", // 2nd
  "bg-gradient-to-r from-pink-600 to-pink-500 text-white border-pink-400", // 3rd
];

const getRankIcon = (rank) => {
  if (rank === 0) return <Medal className="w-5 h-5 text-yellow-600" />;
  if (rank === 1) return <Medal className="w-5 h-5 text-purple-600" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-pink-600" />;
  return <TrendingUp className="w-5 h-5 text-purple-400" />;
};

const Leaderboard = ({ isOpen, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard(true);
    }
  }, [isOpen]);

  const fetchLeaderboard = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setCurrentOffset(0);
      setLeaderboard([]);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);
    
    try {
      const offset = reset ? 0 : currentOffset;
      const data = await websiteAnalysisService.getLeaderboard(pageSize, offset);
      
      if (reset) {
        setLeaderboard(data.leaderboard || []);
      } else {
        setLeaderboard(prev => [...prev, ...(data.leaderboard || [])]);
      }
      
      // Update pagination state
      setTotalCount(data.total || (data.leaderboard || []).length);
      setCurrentOffset(offset + pageSize);
      
      // Check if there are more items to load
      const receivedItems = (data.leaderboard || []).length;
      const isLastPage = receivedItems < pageSize;
      setHasMore(!isLastPage);
      
    } catch (err) {
      setError(err.message || "Failed to load leaderboard data");
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreProjects = () => {
    if (!loadingMore && hasMore) {
      fetchLeaderboard(false);
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
        className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
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
          <p className="text-purple-100 mt-2">
            Top websites with the best analysis scores ({totalCount > 0 ? `Showing ${leaderboard.length} of ${totalCount}` : '0 entries'})
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-purple-900/30 border-t-purple-400 rounded-full animate-spin"></div>
                <p className="text-gray-300">Loading leaderboard...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <Globe className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-300">{error}</p>
              <button
                onClick={() => fetchLeaderboard(true)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300">
                No leaderboard data available yet.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Be the first to analyze a website!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, idx) => (
                <motion.div
                  key={entry.url + entry.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx % 10) * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    idx < 3
                      ? rankColors[idx] + " shadow-lg transform hover:scale-105"
                      : "bg-gray-700/50 border-gray-600 hover:bg-gray-600/50"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getRankIcon(idx)}
                      <span
                        className={`text-xl font-bold ${
                          idx < 3 ? "text-white" : "text-gray-300"
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
                        idx < 3 ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {entry.domain}
                    </a>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          idx < 3 ? "text-white" : "text-purple-400"
                        }`}
                      >
                        {entry.overallScore}
                      </div>
                      <div
                        className={`text-xs ${
                          idx < 3 ? "text-white/80" : "text-gray-400"
                        }`}
                      >
                        Score
                      </div>
                    </div>
                    <div
                      className={`text-xs ${
                        idx < 3 ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {entry.formattedDate}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Load More Button */}
              {hasMore && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center pt-4"
                >
                  <button
                    onClick={loadMoreProjects}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Loading more...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Load More Projects
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Updated in real-time</span>
            <span>Total entries: {leaderboard.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
// Force cache refresh - Mon Jul 28 15:17:47 UTC 2025
