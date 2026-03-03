import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center py-12">
    <div
      className="w-6 h-6 rounded-full animate-spin"
      style={{
        border: '2px solid rgba(180,83,9,0.2)',
        borderTopColor: '#B45309',
      }}
    />
  </div>
);
