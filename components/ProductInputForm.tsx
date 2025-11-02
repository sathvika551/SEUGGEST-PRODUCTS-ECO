
import React from 'react';

interface ProductInputFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export const ProductInputForm: React.FC<ProductInputFormProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., plastic toothbrush, paper towels..."
        className="w-full px-4 py-3 text-lg border-2 border-brand-green-200 rounded-full focus:ring-2 focus:ring-brand-green-500 focus:border-brand-green-500 outline-none transition duration-200 ease-in-out"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-brand-green-600 rounded-full hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500 disabled:bg-brand-green-300 disabled:cursor-not-allowed transition-colors duration-300 shrink-0"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : (
          'Find Alternative'
        )}
      </button>
    </form>
  );
};
