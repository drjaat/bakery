import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));

    setIsDarkMode(storedDarkMode ?? prefersDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark"); // Toggle the 'dark' class on the html element
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
