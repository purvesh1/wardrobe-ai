import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-foreground">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-orange-200/40 to-orange-100 shadow-inner">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold">{message}</p>
        <p className="text-sm text-foreground/70">This usually wraps in a few seconds.</p>
      </div>
    </div>
  );
};

export default Loader;
