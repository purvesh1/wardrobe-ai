
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-t-accent border-r-accent border-b-accent border-l-secondary rounded-full animate-spin mb-6"></div>
      <p className="text-lg font-semibold text-light">{message}</p>
      <p className="text-sm text-highlight">This may take a moment...</p>
    </div>
  );
};

export default Loader;
