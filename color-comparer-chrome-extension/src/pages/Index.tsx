import { useEffect } from 'react';
import ColorComparer from '../components/ColorComparer';

const Index = () => {
  useEffect(() => {
    document.title = "Color Comparer";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <ColorComparer />
    </div>
  );
};

export default Index;