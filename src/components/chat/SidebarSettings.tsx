import React from 'react';
import { Settings, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function SidebarSettings() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <div className="mt-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 hover:bg-foreground/5 rounded-lg flex items-center gap-2 group"
      >
        <Settings className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground">Settings</span>
      </button>

      {isOpen && (
        <div className="mt-2 p-2 space-y-2 bg-card/50 rounded-lg border border-foreground/5">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-full p-2 hover:bg-foreground/5 rounded-lg flex items-center justify-between text-sm"
          >
            <span>Theme</span>
            {theme === 'light' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full p-2 hover:bg-foreground/5 rounded-lg flex items-center justify-between text-sm"
          >
            <span>Sound</span>
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}