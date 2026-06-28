import { useEffect, useState } from "react";

// Retorna true quando a tela é maior que o breakpoint (padrão: 900px = desktop)
export function useIsDesktop(breakpoint = 900) {
  const query = `(min-width: ${breakpoint}px)`;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
