import React from 'react';
import { ErrorMessageProps } from '../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white rounded-2xl shadow-card p-8 max-w-md mx-auto text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Failed to Load Medal Data
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        <button 
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Try Again
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>If the problem persists, please check:</p>
          <ul className="mt-2 text-xs space-y-1">
            <li>• Your internet connection</li>
            <li>• Server availability</li>
            <li>• Browser console for details</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 