declare global {
  interface Window {
    theme: string;
    setTheme: (theme: string) => void;
  }
}

export {};
