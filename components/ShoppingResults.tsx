import React, { useState, useEffect } from 'react';
import type { IdentifiedItem, ShoppingSuggestion } from '../types';
import { findSimilarItems } from '../services/shoppingService';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { SadIcon } from './icons';

interface ShoppingResultsProps {
  item: IdentifiedItem;
}

const ShoppingResults: React.FC<ShoppingResultsProps> = ({ item }) => {
  const [suggestions, setSuggestions] = useState<ShoppingSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await findSimilarItems(item.itemName);
        if (results.length === 0) {
          setError("We couldn't find any similar items. Try another outfit!");
        }
        setSuggestions(results);
      } catch (err: any) {
        console.error("Shopping fetch failed:", err);
        setError(`Failed to find items. ${err.message || 'Please check your connection or try again later.'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [item.itemName]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader message={`Searching for "${item.itemName}"...`} />;
    }

    if (error) {
      return (
        <div className="text-center p-8 text-light flex flex-col items-center justify-center h-full">
          <SadIcon className="w-20 h-20 mx-auto mb-4 text-highlight" />
          <h2 className="text-xl font-bold text-red-400 mb-2">Search Failed</h2>
          <p className="max-w-md">{error}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-h-[65vh] overflow-y-auto p-1">
        {suggestions.map((suggestion, index) => (
          <ProductCard key={index} suggestion={suggestion} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6 pb-4 border-b border-highlight/20">
        <h2 className="text-3xl font-bold text-accent">{item.itemName}</h2>
        <p className="text-md text-highlight mt-1">{item.description}</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default ShoppingResults;
