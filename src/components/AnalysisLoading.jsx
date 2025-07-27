import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AnalysisLoading = ({ url }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
        {/* Lottie Animation */}
        <div className="w-48 h-48 mx-auto mb-6">
          <DotLottieReact
            src="https://lottie.host/b8808316-d288-48f6-a40b-40caec3165a0/WJo6quTCtm.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Loading Text */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Analyzing Website
        </h3>
        <p className="text-gray-600 mb-4">Wait a bit, it will take some time</p>

        {/* URL Display */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-500">Analyzing:</p>
          <p className="text-blue-600 font-medium break-all">{url}</p>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">SEO Checks</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Performance Tests</span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Security Analysis</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisLoading;
