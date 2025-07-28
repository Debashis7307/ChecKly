import React from "react";
import logo from "../assets/logo.png";
import boyImage from "../assets/boy.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src={logo} alt="ChecKly" className="h-8 w-auto" />
            <span className="text-xl font-bold">ChecKly</span>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            <span>&copy; 2025 ChecKly. All rights reserved.</span>
            <span className="text-sm text-gray-500">Made by</span>

            {/* Debashis */}
            <div className="flex items-center space-x-2 group">
              <a
                href="https://deb-folio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600 hover:border-purple-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                  <img
                    src={boyImage}
                    alt="Debashis"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Debashis
                </div>
              </a>
              <span className="text-sm text-gray-400">Debashis</span>
            </div>

            <span className="text-sm text-gray-500">&</span>

            {/* Parthib */}
            <div className="flex items-center space-x-2 group">
              <a
                href="https://hawkaii.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600 hover:border-purple-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                  <img
                    src={boyImage}
                    alt="Parthib"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Parthib
                </div>
              </a>
              <span className="text-sm text-gray-400">Parthib</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;