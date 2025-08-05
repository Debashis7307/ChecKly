import React from 'react';

const WarningBanner = ({ visible }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-[99999] flex items-center justify-center border-b-2 border-yellow-400
        transition-transform duration-500 ease-in-out
        ${visible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}
      `}
      style={{ background: '#fffbe6', color: '#ad6800', minHeight: '56px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-3 py-3 px-6">
        {/* Warning Icon (SVG) */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#faad14"/>
          <path d="M12 7v5m0 3h.01" stroke="#ad6800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-semibold">
          This website uses the free version of Render for backend deployment and the free tier of Gemini. You may experience occasional errors or slowdowns due to these limitations.
        </span>
      </div>
    </div>
  );
};

export default WarningBanner;
