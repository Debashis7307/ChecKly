import React from "react";
import { Search, Globe } from "lucide-react";

const HeroSection = ({ url, setUrl, handleAnalyze, isAnalyzing }) => {
  return (
    <main className="relative pt-32 bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-yellow-400/20 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-27">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Text Content */}
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in text-center">
              Website Analysis
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent text-2xl md:text-5xl">
                Made Simple
              </span>
            </h1>

            <p className="text-base md:text-2xl text-gray-300 mb-6 md:mb-12 animate-slide-up max-w-2xl mx-auto text-center">
              Get instant insights about your website's performance, security,
              and SEO. Make your website ready for success with ChecKly.
            </p>

            {/* URL Input Form */}
            <div className="mb-8 animate-slide-up max-w-xl mx-auto">
              <form onSubmit={handleAnalyze} className="relative">
                <div className="relative">
                  <Globe className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://enter.your.website"
                    className="input-field pl-16 pr-32 bg-gray-800 border-gray-600 text-white placeholder-gray-400 placeholder:text-xs md:placeholder:text-base"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs md:text-base">
                          Analyzing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-xs md:text-base">Analyze</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Example URLs */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>example.com</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>yourwebsite.org</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>mysite.net</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
