/**
 * React TypeScript Tokens & Theme Provider for Fingoals
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface FingoalsTokens {
  colors: {
    brandPrimary: string;
    canvas: string;
    surface: string;
    surfaceInverse: string;
    textPrimary: string;
    textSecondary: string;
    borderDefault: string;
  };
  radius: {
    card: string;
    pill: string;
  };
}

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeMode }> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('fingoals-theme', mode);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('fingoals-theme') as ThemeMode;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const PillButton: React.FC<{
  variant?: 'primary' | 'secondary' | 'dark';
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'primary', children, icon, onClick }) => {
  const bgStyles = {
    primary: 'var(--fg-action-primary-bg)',
    secondary: 'var(--fg-action-secondary-bg)',
    dark: 'var(--fg-action-dark-bg)',
  };

  const textStyles = {
    primary: 'var(--fg-action-primary-text)',
    secondary: 'var(--fg-action-secondary-text)',
    dark: 'var(--fg-action-dark-text)',
  };

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgStyles[variant],
        color: textStyles[variant],
        borderRadius: 'var(--fg-radius-full)',
        padding: '10px 18px',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: 'var(--fg-font-size-13)',
        fontWeight: 'var(--fg-font-weight-semibold)',
        cursor: 'pointer',
      }}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export const DashboardCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}> = ({ children, dark = false }) => {
  return (
    <div
      style={{
        backgroundColor: dark ? 'var(--fg-bg-surface-inverse)' : 'var(--fg-bg-surface)',
        color: dark ? 'var(--fg-text-inverse)' : 'var(--fg-text-primary)',
        borderRadius: 'var(--fg-radius-2xl)',
        padding: 'var(--fg-spacing-24)',
        boxShadow: 'var(--fg-card-shadow)',
        border: dark ? 'none' : '1px solid var(--fg-border-default)',
      }}
    >
      {children}
    </div>
  );
};
