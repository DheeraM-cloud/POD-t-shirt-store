
import React from 'react';
import { TShirtCustomizer } from '@/components/TShirtCustomizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Custom T-Shirt Designer</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <TShirtCustomizer />
      </main>
      
      <footer className="py-6 bg-gray-100 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Custom T-Shirt Store
        </div>
      </footer>
    </div>
  );
};

export default Index;
