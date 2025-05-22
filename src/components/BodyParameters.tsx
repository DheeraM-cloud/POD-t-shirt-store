
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface BodyParametersProps {
  height: number;
  weight: number;
  build: 'lean' | 'reg' | 'athletic' | 'big';
  onHeightChange: (height: number) => void;
  onWeightChange: (weight: number) => void;
  onBuildChange: (build: 'lean' | 'reg' | 'athletic' | 'big') => void;
}

export const BodyParameters = ({
  height,
  weight,
  build,
  onHeightChange,
  onWeightChange,
  onBuildChange
}: BodyParametersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Body Parameters</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="height">Height (cm): {height}</Label>
          <Slider
            id="height"
            min={140}
            max={220}
            step={1}
            value={[height]}
            onValueChange={(values) => onHeightChange(values[0])}
          />
        </div>
        
        <div>
          <Label htmlFor="weight">Weight (kg): {weight}</Label>
          <Slider
            id="weight"
            min={40}
            max={150}
            step={1}
            value={[weight]}
            onValueChange={(values) => onWeightChange(values[0])}
          />
        </div>
        
        <div>
          <Label htmlFor="build">Build</Label>
          <Select value={build} onValueChange={(value: 'lean' | 'reg' | 'athletic' | 'big') => onBuildChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select build type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lean">Lean</SelectItem>
              <SelectItem value="reg">Regular</SelectItem>
              <SelectItem value="athletic">Athletic</SelectItem>
              <SelectItem value="big">Big</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
