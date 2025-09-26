import React from 'react';
import type { ShoppingSuggestion } from '../types';

interface ProductCardProps {
  suggestion: ShoppingSuggestion;
}

const ProductCard: React.FC<ProductCardProps> = ({ suggestion }) => {
  return (
    <a
      href={suggestion.product_page_url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col"
      title={suggestion.name}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          src={suggestion.image_url}
          alt={suggestion.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevent infinite loop
            target.src = 'https://via.placeholder.com/400x500.png?text=Image+Not+Found';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
      </div>
      <div className="p-3 flex-grow">
        <p className="text-sm text-light line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {suggestion.name}
        </p>
      </div>
    </a>
  );
};

export default ProductCard;
