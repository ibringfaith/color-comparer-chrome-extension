import { useState } from "react";
import { rgbToHex, parseRgb, isValidHex, isValidRgb } from '../utils/colorUtils';

interface ColorPickerProps {
  label: string;
  onColorChange: (color: string | undefined) => void;
  allowInput?: boolean;
  buttonText?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  onColorChange, 
  allowInput = true,
  buttonText = "Pick Color"
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    let color = inputValue.trim();
    
    // Add # if it's a valid hex without #
    if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(color)) {
      color = `#${color}`;
    }
    
    if (isValidHex(color)) {
      onColorChange(color);
    } else if (isValidRgb(color)) {
      const rgb = parseRgb(color);
      if (rgb) {
        onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
      }
    } else if (inputValue) {
      console.log('Invalid Color Format. Please enter a valid hex (#RRGGBB) or RGB (rgb(r,g,b)) value.');
    }
  };

  const handlePickColor = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.id) {
        console.log('Error. Could not access the current page.');
        return;
      }
      
      // Inject the eyedropper script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          return new Promise<string>((resolve) => {
            if (!('EyeDropper' in window)) {
              resolve('not-supported');
              return;
            }
            
            // @ts-ignore - TypeScript might not recognize EyeDropper API
            const eyeDropper = new window.EyeDropper();
            eyeDropper.open()
              .then((result: { sRGBHex: string }) => resolve(result.sRGBHex))
              .catch(() => resolve('cancelled'));
          });
        }
      }).then((results) => {
        if (!results || results.length === 0) return;
        
        const result = results[0].result;
        if (result === 'not-supported') {
          console.log('Not Supported. EyeDropper is not supported in this browser.');
        } else if (result !== 'cancelled') {
          onColorChange(result);
        }
      });
    } catch (error) {
      console.log('Error. Failed to pick color from page.');
      console.error('Error picking color:', error);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex space-x-2">
        {allowInput && (
          <input
            type="text"
            placeholder="#RRGGBB or rgb(r,g,b)"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="flex-1"
          />
        )}
        <button 
          onClick={handlePickColor}
          className="shrink-0"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;