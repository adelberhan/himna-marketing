"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "./button";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="group fixed bottom-6 right-6 z-50 px-4 py-4 text-white bg-primary-200 hover:cursor-pointer hover:bg-bg-200 rounded-full transition-all hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,119,194,0.3)]"
    >
      <FaArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
    </Button>
  );
}