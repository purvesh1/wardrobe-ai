
import React, { useState } from 'react';
import type { IdentifiedItem } from '../types';
import ShoppingResults from './ShoppingResults';
import { ArrowLeftIcon } from './icons';

interface ResultsViewProps {
  imageUrl: string;
  items: IdentifiedItem[];
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ imageUrl, items, onReset }) => {
  const [selectedItem, setSelectedItem] = useState<IdentifiedItem | null>(null);

  if (selectedItem) {
    return (
      <div className="w-full p-4 md:p-6">
        <button
          onClick={() => setSelectedItem(null)}
          className="flex items-center text-accent font-semibold mb-4 hover:underline"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Analysis
        </button>
        <ShoppingResults item={selectedItem} />
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
       <button
          onClick={onReset}
          className="flex items-center text-accent font-semibold mb-4 hover:underline"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Scan Another Outfit
        </button>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/2 lg:w-2/5 flex-shrink-0">
          <h2 className="text-2xl font-bold text-light mb-4">Your Outfit</h2>
          <img 
            src={imageUrl} 
            alt="Uploaded outfit" 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <h2 className="text-2xl font-bold text-light mb-4">Identified Items</h2>
          {items.length > 0 ? (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="bg-primary p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-highlight hover:bg-opacity-20 border border-transparent hover:border-accent"
                >
                  <h3 className="font-bold text-lg text-accent">{item.itemName}</h3>
                  <p className="text-sm text-highlight">{item.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-highlight">No items could be identified in this photo.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
