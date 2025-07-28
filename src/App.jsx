import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import AnalysisLoading from "./components/AnalysisLoading";
import AnalysisDashboard from "./components/AnalysisDashboard";
import Leaderboard from "./components/Leaderboard";
import websiteAnalysisService from "./services/websiteAnalysis";

function App() {
  const [url, setUrl] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);

    try {
      const results = await websiteAnalysisService.analyzeWebsite(url);
      setAnalysisResults(results);
      setShowDashboard(true);

      setTimeout(() => {
        const dashboardElement = document.getElementById("analysis-dashboard");
        if (dashboardElement) {
          dashboardElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
    setAnalysisResults(null);
    setUrl("");
  };

  const handleNewAnalysis = () => {
    setShowDashboard(false);
    setAnalysisResults(null);
    setUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        setIsAuthModalOpen={setIsAuthModalOpen}
        setIsLeaderboardOpen={setIsLeaderboardOpen}
        handleSignOut={handleSignOut}
      />

      <HeroSection
        url={url}
        setUrl={setUrl}
        handleAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />

      <About />

      {showDashboard && analysisResults && (
        <div id="analysis-dashboard">
          <AnalysisDashboard
            results={analysisResults}
            onBack={handleBackToHome}
            onNewAnalysis={handleNewAnalysis}
            user={user}
            onSignInRequired={() => setIsAuthModalOpen(true)}
          />
        </div>
      )}

      <FeaturesSection />
      <CTASection setIsAuthModalOpen={setIsAuthModalOpen} />
      <Footer />

      {isAnalyzing && <AnalysisLoading url={url} />}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </div>
  );
}

export default App;
