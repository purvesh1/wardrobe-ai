import React, { useEffect, useState } from 'react';
import type { IdentifiedItem } from '../types';
import ShoppingResults from './ShoppingResults';
import { ArrowLeftIcon } from './icons';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface ResultsViewProps {
  imageUrl: string;
  items: IdentifiedItem[];
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ imageUrl, items, onReset }) => {
  const [selectedItem, setSelectedItem] = useState<IdentifiedItem | null>(items[0] ?? null);

  useEffect(() => {
    setSelectedItem(items[0] ?? null);
  }, [items]);

  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-6 border-none bg-white/95 p-12 text-center shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">We couldn't find any items.</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Try another photo with a single, well-lit outfit and ensure the full look is visible in frame.
          </p>
        </div>
        <Button variant="default" size="lg" onClick={onReset}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Scan another outfit
        </Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-none bg-white/95 shadow-2xl">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Analysis ready</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Your AI lookbook
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Scan another outfit
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          <div className="space-y-6">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-orange-200/70 bg-orange-50/80 shadow-inner">
              <img
                src={imageUrl}
                alt="Uploaded outfit"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-2xl border border-orange-200/60 bg-white/90 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Identified items
                </h3>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                  {items.length}
                </span>
              </div>
              <div className="max-h-[320px] space-y-2 overflow-y-auto px-5 pb-5 pr-2">
                {items.map((item) => {
                  const isActive = selectedItem?.itemName === item.itemName;
                  return (
                    <Button
                      key={item.itemName}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'w-full justify-start rounded-xl px-4 py-3 text-left text-sm transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-primary/15 to-orange-200/40 text-primary'
                          : 'text-foreground hover:bg-orange-50'
                      )}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.itemName}</span>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-h-[360px] rounded-2xl border border-orange-200/60 bg-white/90 p-5 shadow-sm sm:p-6">
            {selectedItem ? (
              <ShoppingResults item={selectedItem} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Select an item to view shopping matches.</p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll surface high-quality image results and where to shop them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultsView;
