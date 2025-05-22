
import { useEffect, useState } from 'react';

type Theme = 'default' | 'dark' | 'colorful';

export function useThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + Q for theme switching
      if (e.altKey && e.key === 'q') {
        setCurrentTheme(current => {
          switch (current) {
            case 'default': return 'dark';
            case 'dark': return 'colorful';
            case 'colorful': return 'default';
            default: return 'default';
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  return { currentTheme };
}
