import React from "react";

const WarningBanner = ({ visible }) => {
  return (
    <div
      className={`fixed top-[100px] right-6 z-[99999] max-w-md w-full flex items-center p-4 rounded-2xl shadow-lg
        bg-blue-100 bg-opacity-80 backdrop-blur-md border border-blue-400 text-blue-700
        transition-transform duration-500 ease-in-out
        ${visible ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}
      `}
      style={{ minHeight: "56px" }}
      role="alert"
      aria-live="assertive"
    >
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="12" fill="#3b82f6" />
        <path
          d="M12 7v5m0 3h.01"
          stroke="#1e40af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ml-4 flex-1 text-right font-semibold">
        This website uses the free version of Render for backend deployment and
        the free tier of Gemini. You may experience occasional errors or
        slowdowns due to these limitations.
      </span>
    </div>
  );
};

export default WarningBanner;
