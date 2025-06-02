import { hexToRgb, calculateColorDifference, getToleranceLevel } from '../utils/colorUtils';

interface ToleranceDisplayProps {
  color1: string | null;
  color2: string | null;
}

const ToleranceDisplay: React.FC<ToleranceDisplayProps> = ({ color1, color2 }) => {
  if (!color1 || !color2) {
    return (
      <div className="border rounded-md p-4">
        <h3 className="font-medium text-sm mb-2">Color Tolerance</h3>
        <p className="text-sm text-gray-500">Select two colors to compare</p>
      </div>
    );
  }

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return <p>Invalid color values</p>;
  }

  const difference = calculateColorDifference(rgb1, rgb2);
  const { level, percentage } = getToleranceLevel(difference);

  const getToleranceColor = () => {
    if (level === 'Identical') return 'bg-green-500';
    if (level === 'Very Similar') return 'bg-green-400';
    if (level === 'Similar') return 'bg-yellow-400';
    if (level === 'Different') return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h3 className="font-medium text-sm">Color Tolerance</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{level}</span>
          <span>{Math.round(percentage)}% match</span>
        </div>
        <meter value={percentage} className={`h-2 ${getToleranceColor()}`} min="0" max="100"/>
      </div>
      
      <div className="text-xs text-gray-600">
        <p>Numerical difference: {difference.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ToleranceDisplay;