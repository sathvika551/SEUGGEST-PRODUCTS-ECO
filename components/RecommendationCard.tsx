
import React from 'react';
import type { SustainableProduct } from '../types';
import { LeafIcon } from './icons/LeafIcon';

interface RecommendationCardProps {
  product: SustainableProduct;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ product }) => {
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(product.original_product_category.toLowerCase())}/800/400`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-green-200 animate-fade-in text-left transition-all duration-500">
      <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-brand-green-800 mb-2">{product.name}</h2>
        <p className="text-brand-green-700 mb-6">{product.description}</p>
        
        <h3 className="text-lg font-semibold text-brand-green-800 mb-3">Key Benefits:</h3>
        <ul className="space-y-3">
          {product.sustainability_features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <LeafIcon className="w-5 h-5 text-brand-green-500 mr-3 mt-1 shrink-0" />
              <span className="text-brand-green-800">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
