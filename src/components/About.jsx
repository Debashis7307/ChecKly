import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Search,
  Bot,
  Shield,
  Smartphone,
  Clock,
  Zap,
  Brain,
  GitBranch,
  BarChart3,
  Star,
  FlaskConical,
  Map,
  Tag,
  Server,
  Terminal,
  Globe,
  Download,
  Play,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const problems = [
    {
      icon: <Search className="w-6 h-6" />,
      text: "Invisible to Search Engines - Your beautifully crafted website doesn't appear in Google searches",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      text: "Bot Mismanagement - Unwanted crawlers burning through your server resources while legitimate ones can't access your content",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Security Vulnerabilities - Missing security headers leaving your site exposed to attacks",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      text: "SEO Blind Spots - Critical metadata and structure issues that tank your rankings",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Manual Auditing Hell - Spending hours manually checking what should be automated",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      text: "10x Faster than manual website audits",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      text: "AI-Powered insights that actually make sense",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      text: "CI/CD Ready for automated testing workflows",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      text: "Professional Reports perfect for client presentations",
    },
    {
      icon: <Star className="w-6 h-6" />,
      text: "Open Source with enterprise-level features",
    },
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Robots.txt Validation",
      desc: "Ensure search engines can properly crawl your site while blocking unwanted bots",
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Sitemap Analysis",
      desc: "Validate XML sitemaps structure and discoverability for optimal indexing",
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "SEO Metadata Assessment",
      desc: "Analyze title tags, meta descriptions, and heading hierarchy for search ranking success",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Headers Audit",
      desc: "Verify essential security headers (HSTS, CSP, X-Frame-Options) to protect against common attacks",
    },
  ];

  const accessMethods = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Command Line Interface",
      desc: "Lightning-fast CLI tool for developers and automation workflows",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "REST API Server",
      desc: "HTTP API powering our web frontend and third-party integrations",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Recommendations",
      desc: "Intelligent insights powered by Google Gemini for prioritized action items",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Interactive TUI",
      desc: "Beautiful terminal user interface with real-time progress visualization (coming soon)",
    },
  ];

  return (
    <section
      id="about"
      className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              ChecKly
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            From 0 clicks to hero status - transform your website's
            discoverability and security in minutes, not hours.
          </p>
        </motion.div>

        {/* The Problem Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                The Problem
              </h3>
            </div>
            <p className="text-gray-300 text-lg mb-8">
              In today's digital landscape, having a website isn't enough. You
              need it to be discoverable, secure, and optimized. Many developers
              face these common challenges:
            </p>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="text-red-400 mt-1">{problem.icon}</div>
                  <p className="text-gray-300">{problem.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* The Solution */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                The Solution
              </h3>
            </div>
            <p className="text-gray-300 text-lg">
              ChecKly provides instant, comprehensive website analysis with
              actionable insights. Whether you're launching a new site or
              maintaining an existing one, get the confidence that your website
              is ready for prime time. Just provide a link and the rest will be
              in our hand 😉
            </p>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎯 Key Benefits Our Users Love
            </h3>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{benefit.icon}</div>
                <p className="text-gray-300 font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FlaskConical className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Core Analysis Capabilities
              </h3>
            </div>
            <p className="text-gray-300 text-lg">
              Comprehensive website health checks in seconds
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Access Methods */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🚀 Multiple Access Methods
            </h3>
            <p className="text-gray-300 text-lg">
              Choose your preferred way to analyze websites
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {accessMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{method.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {method.title}
                </h4>
                <p className="text-gray-300">{method.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Start Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-4 md:p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Quick Start
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Installation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                Installation
              </h4>
              <div className="space-y-3 md:space-y-4">
                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700">
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">
                    Using Go Install (Recommended)
                  </h5>
                  <code className="block bg-black/50 p-2 md:p-3 rounded-lg text-green-400 text-xs md:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    {`# Install directly from GitHub (fastest way to get started)
go install github.com/checkly-go/checkly@latest

# Verify installation and run your first check
checkly -url https://example.com`}
                  </code>
                </div>
                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700">
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">
                    From Source (For Contributors)
                  </h5>
                  <code className="block bg-black/50 p-2 md:p-3 rounded-lg text-green-400 text-xs md:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    {`# Clone and build locally
git clone https://github.com/checkly-go/checkly.git
cd checkly
go mod download
go build -o checkly .

# Run your first analysis
./checkly -url https://your-website.com`}
                  </code>
                </div>
              </div>
            </motion.div>

            {/* Basic Usage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                Basic Usage
              </h4>
              <div className="space-y-3 md:space-y-4">
                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700">
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">
                    Quick Website Check
                  </h5>
                  <code className="block bg-black/50 p-2 md:p-3 rounded-lg text-green-400 text-xs md:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    {`# Complete website health check (all tests)
./checkly -url https://example.com

# Focus on specific areas
./checkly -url https://example.com -checkers robots,seo

# Export detailed JSON report
./checkly -url https://example.com -output json -o health-report.json`}
                  </code>
                </div>
                <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-700">
                  <h5 className="text-base md:text-lg font-semibold text-white mb-2">
                    API Server Mode
                  </h5>
                  <code className="block bg-black/50 p-2 md:p-3 rounded-lg text-green-400 text-xs md:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    {`# Start the REST API server
./server

# Server runs on http://localhost:8080
# Visit https://checkly-go.vercel.app/ to use the web interface`}
                  </code>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
