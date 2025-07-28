import React from "react";
import { ArrowRight } from "lucide-react";

const CTASection = ({ setIsAuthModalOpen }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Optimize Your Website?
        </h2>
        <p className="text-xl text-purple-100 mb-8">
          Join thousands of developers and businesses who trust ChecKly for
          their website analysis
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="px-6 py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 border-2 border-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;