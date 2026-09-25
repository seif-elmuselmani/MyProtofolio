import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SECRET_ADMIN_ROUTE = "/vault-gate-9x7k2";

export const SecretKeyShortcutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret combo: Ctrl + Alt + Shift + S
      if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === "S" || e.key === "s" || e.key === "س")) {
        e.preventDefault();
        navigate(SECRET_ADMIN_ROUTE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};
