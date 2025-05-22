
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextCustomizerProps {
  text: string;
  onTextChange: (text: string) => void;
}

export const TextCustomizer = ({ text, onTextChange }: TextCustomizerProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Add Custom Text</h2>
      <Textarea
        placeholder="Enter text to print on your product (max 3 lines)"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full"
        rows={3}
      />
      <p className="text-sm text-gray-500 mt-2">
        Maximum 3 lines of text allowed
      </p>
    </div>
  );
};
