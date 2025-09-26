import React, { useState, useCallback, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { analyzeOutfit } from './services/geminiService';
import type { IdentifiedItem } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import ResultsView from './components/ResultsView';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';

const layoutCopy = {
  heroTitle: 'Snap an outfit, unlock the shopping list.',
  heroSubtitle:
    'Wardrobe AI inspects your look, identifies the hero pieces, and finds shoppable matches in seconds.',
  checklist: [
    'Use a full-body photo in good lighting for best results.',
    'Highlight one outfit per image to improve detection.',
    'We support JPG, PNG, or WebP uploads up to 10 MB.',
  ],
};

type AppState = 'idle' | 'loading' | 'results' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<IdentifiedItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleImageUpload = useCallback(async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setAppState('loading');
    setUploadedImage(objectUrl);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = (reader.result as string).split(',')[1];
        const result = await analyzeOutfit(base64Image, file.type);
        setAnalysisResult(result);
        setAppState('results');
      } catch (err) {
        console.error('Analysis failed:', err);
        setError(
          "Sorry, we couldn't analyze that outfit. The image might be unclear or the items couldn't be identified. Please try another photo."
        );
        setAppState('error');
      }
    };
    reader.onerror = () => {
      console.error('Failed to read file');
      setError('There was an error processing your image file. Please try again.');
      setAppState('error');
    };
  }, []);

  const handleReset = useCallback(() => {
    setAppState('idle');
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
  }, [uploadedImage]);

  const renderIdleState = () => {
    return (
      <Card className="overflow-hidden border-none bg-card shadow-xl">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="space-y-7 bg-gradient-to-br from-amber-100 via-rose-100/60 to-white px-10 py-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                AI stylist
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {layoutCopy.heroTitle}
              </h2>
              <p className="max-w-md text-base text-muted-foreground">
                {layoutCopy.heroSubtitle}
              </p>
            </div>
            <ul className="space-y-3 text-sm text-foreground/80">
              {layoutCopy.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
            <div className="flex flex-col gap-6 px-10 py-10">
              <ImageUploader onImageUpload={handleImageUpload} />
            <div className="flex items-start gap-3 rounded-xl bg-amber-50/80 p-5 text-sm text-amber-900 shadow-sm">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-200/80 text-amber-900 shadow">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-amber-900">Tip for best matches</p>
                <p className="mt-1 text-sm text-amber-800">
                  Capture outfits head-to-toe so the detector can pick up silhouettes, color stories, and accessories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderLoadingState = () => (
    <Card className="flex items-center justify-center border-none bg-card p-16 text-center shadow-xl">
      <Loader message="Analyzing your outfit..." />
    </Card>
  );

  const renderErrorState = () => (
    <Card className="flex flex-col items-center gap-6 border-none bg-card p-12 text-center shadow-xl">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Analysis failed</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          {error ?? 'Something went wrong while analyzing that image. Please try a different photo.'}
        </p>
      </div>
      <Button variant="default" size="lg" onClick={handleReset}>
        Try another photo
      </Button>
    </Card>
  );

  const renderResultsState = () => (
    uploadedImage && analysisResult ? (
      <ResultsView imageUrl={uploadedImage} items={analysisResult} onReset={handleReset} />
    ) : null
  );

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return renderLoadingState();
      case 'results':
        return renderResultsState();
      case 'error':
        return renderErrorState();
      case 'idle':
      default:
        return renderIdleState();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 text-foreground">
      <Header />
      <main className="container mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 sm:py-16">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Wardrobe AI
          </h1>
          <p className="mx-auto max-w-2xl text-base text-foreground/80 sm:text-lg">
            Upload a look you love. We identify the standout pieces and surface shoppable suggestions powered by Gemini and Google Custom Search.
          </p>
        </div>
        {renderContent()}
      </main>
      <footer className="border-t border-orange-200/60 bg-orange-50/80 py-6 text-center text-xs text-foreground/70">
        Wardrobe AI © 2025
      </footer>
    </div>
  );
};

export default App;
