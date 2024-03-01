
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

// Обновляем дефолтные значения контекста для темной темы
export const ThemeContext = createContext({
  theme: 'dark', // Устанавливаем темную тему как значение по умолчанию
  toggleTheme: () => {}, // Функция для переключения темы
});

// Хук для использования контекста темы
export const useTheme = () => useContext(ThemeContext);

// Компонент провайдера темы, устанавливающий темную тему как дефолтную
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // Проверяем сохраненную тему в localStorage, если нет, то используем темную
      const storedTheme = localStorage.getItem('theme');
      return storedTheme || 'dark'; // Теперь 'dark' является значением по умолчанию
    }
    return 'dark'; // Значение по умолчанию для SSR
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Применяем тему к элементу document
      document.documentElement.classList.toggle('dark', theme === 'dark');
      // Сохраняем выбранную тему в localStorage
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Функция для переключения между темной и светлой темами
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    }
  };

  // Предоставляем тему и функцию для ее изменения через контекст
  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
