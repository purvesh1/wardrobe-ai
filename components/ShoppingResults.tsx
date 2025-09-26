import React, { useState, useEffect } from 'react';
import type { IdentifiedItem, ShoppingSuggestion } from '../types';
import { findSimilarItems } from '../services/shoppingService';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { AlertTriangle } from 'lucide-react';

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
        console.error('Shopping fetch failed:', err);
        setError(`Failed to find items. ${err.message || 'Please check your connection or try again later.'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [item.itemName]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-orange-200/70 bg-gradient-to-br from-white via-amber-50/60 to-orange-100/40 py-12 shadow-inner">
          <Loader message={`Searching for "${item.itemName}"...`} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-6 py-12 text-center shadow-inner">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h3 className="text-base font-semibold text-destructive">Search failed</h3>
          <p className="max-w-sm text-sm text-muted-foreground">{error}</p>
        </div>
      );
    }

    return (
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {suggestions.map((suggestion, index) => (
          <ProductCard key={`${suggestion.product_page_url}-${index}`} suggestion={suggestion} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-2 rounded-xl bg-orange-50/70 p-4 shadow-inner">
        <p className="text-xs font-medium uppercase tracking-wide text-orange-700">Shopping focus</p>
        <h2 className="text-xl font-semibold text-foreground">{item.itemName}</h2>
        <p className="text-sm text-foreground/70">{item.description}</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default ShoppingResults;
