import React from 'react';
import { PaletteIcon } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b border-orange-200/60 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-lg font-semibold text-primary-foreground shadow-md">
            WA
          </span>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
              Wardrobe AI
            </h1>
            <p className="flex items-center gap-1 text-xs text-foreground/70">
              <PaletteIcon className="h-3.5 w-3.5" />
              AI-powered outfit matcher
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
