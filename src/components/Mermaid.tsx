import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

let initialized = false;

function initMermaid() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    themeVariables: {
      fontFamily: 'Noto Sans SC, sans-serif',
    },
  });
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    initMermaid();

    let mounted = true;
    mermaid
      .render(`mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, chart)
      .then(({ svg }) => {
        if (!mounted || !ref.current) return;
        ref.current.innerHTML = svg;
      })
      .catch((err) => {
        console.error('Mermaid render failed:', err);
        if (!mounted) return;
        setError('Failed to render diagram');
      });

    return () => {
      mounted = false;
    };
  }, [chart]);

  if (error) {
    return <div className="text-red-500 text-sm py-2">{error}</div>;
  }

  return <div ref={ref} className="mermaid-container my-4" />;
};

export default Mermaid;
