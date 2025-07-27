import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Search,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logo from "./assets/logo.png";

function App() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Here you would implement the actual website analysis
      alert(
        "Website analysis feature will be implemented with Firebase integration!"
      );
    }, 2000);
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Security Check",
      description:
        "Analyze your website's security vulnerabilities and SSL certificates",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Performance Test",
      description:
        "Check loading speed, Core Web Vitals, and optimization opportunities",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
      title: "SEO Analysis",
      description:
        "Get detailed insights about your website's search engine optimization",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg"
            : "bg-white/80 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="ChecKly" className="h-10 w-auto" />
              <span className="text-2xl font-bold gradient-text">ChecKly</span>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
            </div>

            {/* Desktop Auth Buttons - Right */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sign In
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                Sign Up
              </button>
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
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative pt-24 bg-white">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-bounce-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-27">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left lg:pl-8">
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Website Analysis
                <span className="block gradient-text">Made Simple</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-slide-up max-w-2xl mx-auto lg:mx-0">
                Get instant insights about your website's performance, security,
                and SEO. Make your website ready for success with ChecKly.
              </p>

              {/* URL Input Form */}
              <div className="mb-8 animate-slide-up max-w-xl mx-auto lg:mx-0">
                <form onSubmit={handleAnalyze} className="relative">
                  <div className="relative">
                    <Globe className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://entire.your.website"
                      className="input-field pl-16 pr-32"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isAnalyzing}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-3 px-6 flex items-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span>Analyze</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Example URLs */}
                <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-500">
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

            {/* Right Side - Lottie Animation */}
            <div className="flex justify-center lg:justify-end animate-fade-in lg:pt-8 lg:pr-8">
              <div className="w-full max-w-md bg-transparent">
                <DotLottieReact
                  src="https://lottie.host/83234873-d991-47fe-a8e4-7aa02f97481b/3mLZAY4ZFD.lottie"
                  loop
                  autoplay
                  style={{
                    width: "120%",
                    height: "450px",
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block gradient-text">Check Your Website</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analysis tools to ensure your website is performing
              at its best
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-3xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Website?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers and businesses who trust ChecKly for
            their website analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-6 py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 border-2 border-white">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={logo} alt="ChecKly" className="h-8 w-auto" />
              <span className="text-xl font-bold">ChecKly</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 ChecKly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
