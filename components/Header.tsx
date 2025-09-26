
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-secondary shadow-md">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-accent tracking-wider">
          Wardrobe<span className="text-light">AI</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
