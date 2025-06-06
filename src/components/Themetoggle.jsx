import React, { useEffect } from "react";

import { useState } from "react";
import Buttons from "./Buttons";

function Themetoggle() {
  const [dark, setdark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setdark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setdark(false);
    }
  }, []);

  const toggletheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setdark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setdark(true);
    }
  };

  return (
    <div className="flex justify-end items-center px-4 py-2">
      <button
        onClick={toggletheme}
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
