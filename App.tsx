
import React, { useState, useCallback } from 'react';
import { getSustainableAlternative } from './services/geminiService';
import type { SustainableProduct } from './types';
import { ProductInputForm } from './components/ProductInputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { LeafIcon } from './components/icons/LeafIcon';

const App: React.FC = () => {
  const [productQuery, setProductQuery] = useState<string>('');
  const [recommendation, setRecommendation] = useState<SustainableProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a product name.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getSustainableAlternative(query);
      setRecommendation(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t find a recommendation. Please try another product.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-green-50 text-brand-green-900 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        <header className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <LeafIcon className="w-12 h-12 text-brand-green-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-green-800 tracking-tight">
              EcoChoice AI
            </h1>
          </div>
          <p className="text-md sm:text-lg text-brand-green-700">
            Find sustainable alternatives to everyday products.
          </p>
        </header>

        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-brand-green-200">
          <ProductInputForm
            value={productQuery}
            onChange={setProductQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="w-full mt-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-brand-green-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green-600"></div>
              <p className="mt-4 text-lg">Searching for a greener choice...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {recommendation && !isLoading && (
            <RecommendationCard product={recommendation} />
          )}

          {!recommendation && !isLoading && !error && (
            <div className="text-center p-8 bg-white/60 rounded-2xl border border-brand-green-200">
                <LeafIcon className="w-16 h-16 text-brand-green-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-brand-green-800 mb-2">Ready to Go Green?</h2>
                <p className="text-brand-green-600">
                    Enter a product like "plastic water bottle" or "paper towels" to discover a sustainable alternative.
                </p>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full max-w-2xl mx-auto mt-12 text-center text-brand-green-600 text-sm">
        <p>Powered by AI to help you make more sustainable choices.</p>
      </footer>
    </div>
  );
};

export default App;
