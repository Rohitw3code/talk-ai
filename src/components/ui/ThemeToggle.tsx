import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-primary/90 to-purple-600/90 p-1 transition-colors duration-300 focus:outline-none"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ease-in-out`}
      >
        {theme === 'light' ? (
          <Sun className="h-6 w-6 p-1 text-yellow-500" />
        ) : (
          <Moon className="h-6 w-6 p-1 text-indigo-700" />
        )}
      </span>
    </button>
  );
}