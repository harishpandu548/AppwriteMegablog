import React, { useEffect } from "react";

import { useState } from "react";
// import Buttons from "./Buttons";

function Themetoggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDark(true);
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <div className="flex justify-end items-center px-4 py-2">
      <button
        onClick={toggleTheme}
        className="inline-flex items-center justify-center 
               px-2 py-1 text-xs 
               sm:px-3 sm:py-2 sm:text-sm 
               font-medium rounded 
               bg-black text-white 
               dark:bg-white dark:text-black 
               w-auto max-w-fit"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Themetoggle;
