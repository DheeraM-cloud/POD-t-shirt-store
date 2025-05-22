
import React, { useState } from 'react';
import { ProductSelector } from './ProductSelector';
import { ImageUploader } from './ImageUploader';
import { TextCustomizer } from './TextCustomizer';
import { BodyParameters } from './BodyParameters';
import { ProductPreview } from './ProductPreview';

export const TShirtCustomizer = () => {
  const [productType, setProductType] = useState<'tshirt' | 'hoodie' | 'sleevie' | 'cap'>('tshirt');
  const [bodyHeight, setBodyHeight] = useState<number>(180);
  const [bodyWeight, setBodyWeight] = useState<number>(80);
  const [bodyBuild, setBodyBuild] = useState<'lean' | 'reg' | 'athletic' | 'big'>('athletic');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>('');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col space-y-6">
        <ProductSelector 
          productType={productType} 
          onSelectProduct={setProductType} 
        />
        
        <ImageUploader 
          onImageUpload={setCustomImage}
        />
        
        <TextCustomizer 
          text={customText}
          onTextChange={setCustomText}
        />
      </div>
      
      <div className="flex flex-col space-y-6">
        <ProductPreview 
          productType={productType}
          customImage={customImage}
          customText={customText}
        />
        
        <BodyParameters
          height={bodyHeight}
          weight={bodyWeight}
          build={bodyBuild}
          onHeightChange={setBodyHeight}
          onWeightChange={setBodyWeight}
          onBuildChange={setBodyBuild}
        />
      </div>
    </div>
  );
};
