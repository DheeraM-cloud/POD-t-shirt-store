
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductSelectorProps {
  productType: 'tshirt' | 'hoodie' | 'sleevie' | 'cap';
  onSelectProduct: (type: 'tshirt' | 'hoodie' | 'sleevie' | 'cap') => void;
}

export const ProductSelector = ({ productType, onSelectProduct }: ProductSelectorProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Select Product</h2>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={productType === 'tshirt' ? 'default' : 'outline'}
          onClick={() => onSelectProduct('tshirt')}
        >
          T-Shirt
        </Button>
        <Button 
          variant={productType === 'hoodie' ? 'default' : 'outline'}
          onClick={() => onSelectProduct('hoodie')}
        >
          Hoodie
        </Button>
        <Button 
          variant={productType === 'sleevie' ? 'default' : 'outline'}
          onClick={() => onSelectProduct('sleevie')}
        >
          Sleevie
        </Button>
        <Button 
          variant={productType === 'cap' ? 'default' : 'outline'}
          onClick={() => onSelectProduct('cap')}
        >
          Cap
        </Button>
      </div>
    </div>
  );
};
