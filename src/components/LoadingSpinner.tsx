import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Olympic rings loading animation */}
        <div className="flex justify-center gap-1 mb-6">
          <div className="w-8 h-8 border-3 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-8 h-8 border-3 border-gray-800 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-8 h-8 border-3 border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-8 h-8 border-3 border-red-400 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Loading Medal Data</h3>
        <p className="text-white/80">Fetching the latest Olympic standings...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 