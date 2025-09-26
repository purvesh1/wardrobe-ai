
import React, { useState, useCallback } from 'react';
import { analyzeOutfit } from './services/geminiService';
import type { IdentifiedItem } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import ResultsView from './components/ResultsView';
import { CameraIcon } from './components/icons';

type AppState = 'idle' | 'loading' | 'results' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<IdentifiedItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setAppState('loading');
    setUploadedImage(URL.createObjectURL(file));
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
        console.error("Analysis failed:", err);
        setError("Sorry, we couldn't analyze that outfit. The image might be unclear or the items couldn't be identified. Please try another photo.");
        setAppState('error');
      }
    };
    reader.onerror = () => {
      console.error("Failed to read file");
      setError("There was an error processing your image file. Please try again.");
      setAppState('error');
    };
  }, []);

  const handleReset = () => {
    setAppState('idle');
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <Loader message="Analyzing your outfit..." />;
      case 'results':
        return analysisResult && uploadedImage && (
          <ResultsView 
            imageUrl={uploadedImage} 
            items={analysisResult} 
            onReset={handleReset} 
          />
        );
      case 'error':
        return (
          <div className="text-center p-8 text-light">
            <h2 className="text-xl font-bold text-red-400 mb-4">Analysis Failed</h2>
            <p className="mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="bg-accent text-primary font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-center">
              <div className="mb-6 text-accent">
                <CameraIcon className="w-24 h-24 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-light mb-2">Find Your Style</h2>
              <p className="text-highlight max-w-md mx-auto">
                Upload a photo of an outfit you love, and our AI will find similar items you can shop instantly.
              </p>
            </div>
            <div className="mt-10">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-primary font-sans text-light flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto bg-secondary rounded-2xl shadow-2xl min-h-[70vh] flex items-center justify-center">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-highlight">
        <p>Wardrobe AI &copy; 2025</p>
      </footer>
    </div>
  );
};

export default App;
