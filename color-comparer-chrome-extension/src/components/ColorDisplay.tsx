import { hexToRgb } from '../utils/colorUtils';

interface ColorDisplayProps {
  color: string | null;
  label: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ color, label }) => {
  const rgb = color ? hexToRgb(color) : null;
  
  return (
    <div className="border rounded-md p-4 space-y-2">
      <h3 className="font-medium text-sm">{label}</h3>
      {color ? (
        <>
          <div 
            className="h-16 rounded-md border shadow-inner" 
            style={{ backgroundColor: color }}
          />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-100 p-2 rounded">
              <span className="font-semibold">HEX:</span> {color}
            </div>
            <div className="bg-slate-100 p-2 rounded">
              <span className="font-semibold">RGB:</span> {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'N/A'}
            </div>
          </div>
        </>
      ) : (
        <div className="h-16 rounded-md border bg-gray-100 flex items-center justify-center text-gray-400">
          No color selected
        </div>
      )}
    </div>
  );
};

export default ColorDisplay;