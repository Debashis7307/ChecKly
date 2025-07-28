import React from "react";
import { Shield, Zap, CheckCircle } from "lucide-react";

const FeaturesSection = () => {
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
    <section id="features" className="py-20 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">Check Your Website</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive analysis tools to ensure your website is performing
            at its best
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-purple-500"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;