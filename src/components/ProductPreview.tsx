
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductPreviewProps {
  productType: 'tshirt' | 'hoodie' | 'sleevie' | 'cap';
  customImage: string | null;
  customText: string;
}

export const ProductPreview = ({
  productType,
  customImage,
  customText
}: ProductPreviewProps) => {
  // This would be replaced with actual 3D rendering in a production app
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Product Preview</h2>
      
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        {customImage ? (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-700">
                {productType.toUpperCase()}
              </span>
            </div>
            <img 
              src={customImage} 
              alt="Custom design" 
              className="w-1/2 h-1/2 object-contain mx-auto"
            />
            {customText && (
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-sm font-medium bg-white/80 py-1 px-2 mx-auto inline-block">
                  {customText.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500">
              Upload an image to see preview
            </p>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Product: {productType}</li>
          <li>Custom design: {customImage ? 'Yes' : 'No'}</li>
          <li>Custom text: {customText ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};
