import React from 'react';
import type { ShoppingSuggestion } from '../types';
import { Card, CardContent } from './ui/card';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  suggestion: ShoppingSuggestion;
}

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x800.png?text=Preview+Unavailable';

const ProductCard: React.FC<ProductCardProps> = ({ suggestion }) => {
  return (
    <Card className="group h-full overflow-hidden border-none bg-white/95 shadow-lg ring-1 ring-orange-100/60 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <a
        href={suggestion.product_page_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        title={suggestion.name}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-orange-50/80">
          <img
            src={suggestion.image_url}
            alt={suggestion.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(event) => {
              const target = event.target as HTMLImageElement;
              target.onerror = null;
              target.src = FALLBACK_IMAGE;
            }}
          />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between p-4">
          <p className="line-clamp-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
            {suggestion.name}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs font-medium text-foreground/70">
            <span>View product</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </CardContent>
      </a>
    </Card>
  );
};

export default ProductCard;
