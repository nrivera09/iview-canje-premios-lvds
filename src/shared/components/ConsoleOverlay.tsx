// src/shared/components/ConsoleOverlay.tsx
"use client";

import React, { useEffect, useState } from "react";

const MAX_LINES = 30;

interface ConsoleOverlayProps {
  onClick?: () => void;
}

export const ConsoleOverlay: React.FC<ConsoleOverlayProps> = ({ onClick }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const logHandler =
      (type: "log" | "error" | "warn") =>
      (...args: any[]) => {
        const message = `[${type.toUpperCase()}] ${args.map(String).join(" ")}`;
        setLogs((prev) => {
          const updated = [...prev, message];
          return updated.slice(-MAX_LINES); // solo las últimas
        });

        // También imprimir por consola normal (por si acaso)
        if (type === "log") originalLog(...args);
        if (type === "error") originalError(...args);
        if (type === "warn") originalWarn(...args);
      };

    console.log = logHandler("log");
    console.error = logHandler("error");
    console.warn = logHandler("warn");

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#111",
        color: "#0f0",
        padding: "8px",
        fontSize: "12px",
        maxHeight: "30vh",
        overflowY: "auto",
        width: "100%",
        zIndex: 9999,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      <code
        className=" bg-red-700 absolute top-0 right-0 py-1 px-3 text-[10px] text-white"
        onClick={onClick}
      >
        X
      </code>
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
};
