
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string | null) => void;
}

export const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
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
      handleFile(files[0]);
    }
  }, []);
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Upload Your Image</h2>
      
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
        />
        <Button asChild>
          <label htmlFor="image-upload">Select Image</label>
        </Button>
      </div>
    </div>
  );
};
