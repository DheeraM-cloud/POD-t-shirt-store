
import React, { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string | null) => void;
}

export const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image transition effect
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [images]);
  
  // Whenever current image changes, update the parent
  useEffect(() => {
    if (images.length > 0) {
      onImageUpload(images[currentImageIndex]);
    }
  }, [currentImageIndex, images, onImageUpload]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const newImages: string[] = [];
    
    Array.from(files).forEach(file => {
      if (!file.type.match('image.*')) {
        alert('Please select image files only');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          newImages.push(e.target.result);
          
          // If we've processed all files, update the state
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
            // If this is the first image, set it as current
            if (images.length === 0) {
              onImageUpload(newImages[0]);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const clearImages = () => {
    setImages([]);
    onImageUpload(null);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Upload Your Image</h2>
      
      {images.length > 0 && (
        <div className="mb-4">
          <div className="relative h-40 overflow-hidden rounded-md">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Uploaded ${index}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearImages}
            >
              Clear
            </Button>
            {images.length > 1 && (
              <div className="flex space-x-1">
                {images.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div 
        className={`border-2 border-dashed p-8 text-center rounded-lg ${
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600 mb-4">
          Drag and drop an image here, or click to select
        </p>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          id="image-upload"
          onChange={handleFileInput}
          multiple
        />
        <Button asChild>
          <label htmlFor="image-upload">Select Image</label>
        </Button>
      </div>
    </div>
  );
};
