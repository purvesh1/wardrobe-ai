import React from 'react';
import { PaletteIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header: React.FC = () => {
  return (
    <header className="border-b border-orange-200/60 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTpr3Qg7TGy-58vBiABHbbCnfbAPxCnIgDUov7kfgiScHZFJZQQFck3kly9d_3qy9GX5kPxS-F0-hMBW8GNlhQtWGEj61lzOVgUF__K0jgvEIxXda7eGplVVA" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> 
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
