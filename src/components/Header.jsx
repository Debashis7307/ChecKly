import React from "react";
import { Menu, X, Terminal } from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown";
import logo from "../assets/logo.png";

const Header = ({
  isScrolled,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  user,
  setIsAuthModalOpen,
  setIsLeaderboardOpen,
  handleSignOut,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-lg border-b border-purple-500/20"
          : "bg-black/80 backdrop-blur-md border-b border-purple-500/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="ChecKly" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-white">ChecKly</span>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Features
            </a>
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium flex items-center gap-1"
            >
              🏆 Leaderboard
            </button>
            <a
              href="#about"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              About
            </a>
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/checkly-go/checkly/releases/tag/v0.1.0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-600 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-yellow-400 animate-pulse"
            >
              <Terminal className="w-5 h-5" />
              <span>CLI</span>
            </a>
            {user ? (
              <UserProfileDropdown user={user} onSignOut={handleSignOut} />
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-600">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <button
                onClick={() => setIsLeaderboardOpen(true)}
                className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                🏆 Leaderboard
              </button>
              <a
                href="#about"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                About
              </a>
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 font-medium">
                    Welcome,{" "}
                    {user.displayName || user.email?.split("@")[0] || "User"}!
                  </span>
                  <UserProfileDropdown
                    user={user}
                    onSignOut={handleSignOut}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;