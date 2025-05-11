import { useState } from "react";
import ColorPicker from './ColorPicker';
import ColorDisplay from './ColorDisplay';
import ToleranceDisplay from './ToleranceDisplay';

const ColorComparer: React.FC = () => {
  const [color1, setColor1] = useState<string | null>(null);
  const [color2, setColor2] = useState<string | null>(null);

  const handleClearColors = () => {
    setColor1(null);
    setColor2(null);
    console.log('Colors Cleared. You can now select new colors to compare.');
  };

  return (
    <div className="w-80 p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-bold">Color Comparer</h1>
        <p className="text-sm text-gray-500">Compare two colors</p>
      </div>

      <div className="space-y-1">
        <ColorPicker 
          label="Reference Color" 
          onColorChange={setColor1}
          allowInput={true}
        />
        <ColorDisplay color={color1} label="Reference Color" />
      </div>

      <div className="space-y-1">
        <ColorPicker 
          label="Comparison Color" 
          onColorChange={setColor2}
          allowInput={false}
          buttonText="Pick Color from Page"
        />
        <ColorDisplay color={color2} label="Comparison Color" />
      </div>

      <ToleranceDisplay color1={color1} color2={color2} />

      <button 
        onClick={handleClearColors}
        className="w-full"
      >
        Clear Colors
      </button>
    </div>
  );
};

export default ColorComparer;