"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowDownIcon } from "../icons";

export function DirectionsFab() {
  const [directionsVisible, setDirectionsVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const label = directionsVisible ? "View ingredients" : "View directions";
  const href = directionsVisible ? "#ingredients-section" : "#directions-section";

  useEffect(() => {
    const target = document.getElementById("directions-section");
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setDirectionsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      setExpanded(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setExpanded(true), 300);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <a
      aria-label={label}
      className={`fixed right-4 bottom-4 z-30 block h-12 overflow-hidden rounded-full bg-on-surface font-bold text-surface shadow-xl transition-[width,transform,background-color,color] duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden ${
        expanded ? "w-48" : "w-12"
      }`}
      href={href}
    >
      <span
        className={`absolute top-1/2 right-12 left-4 -translate-y-1/2 whitespace-nowrap text-left transition-opacity duration-200 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
      <ArrowDownIcon
        className={`absolute top-1/2 right-3.5 size-5 -translate-y-1/2 transition-transform duration-300 ${
          directionsVisible ? "rotate-180" : ""
        }`}
        data-testid="fab-arrow"
      />
    </a>
  );
}
