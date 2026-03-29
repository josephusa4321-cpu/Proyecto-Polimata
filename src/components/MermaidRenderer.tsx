import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with custom theme
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
    themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#3b82f6',
        lineColor: '#60a5fa',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
    }
});

interface MermaidProps {
    chart: string;
}

export const MermaidRenderer: React.FC<MermaidProps> = ({ chart }) => {
    const [svg, setSvg] = useState<string>('');
    const chartId = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);

    useEffect(() => {
        const renderChart = async () => {
            if (!chart.trim()) return;
            
            try {
                // Mermaid render is async in newer versions
                const { svg } = await mermaid.render(chartId.current, chart);
                setSvg(svg);
            } catch (error) {
                console.error('Mermaid render error:', error);
                setSvg('<div class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-mono">Error al renderizar Mermaid: Verifique la sintaxis del diagrama.</div>');
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div 
            className="mermaid-wrapper my-8 flex justify-center w-full overflow-x-auto bg-black/20 p-6 rounded-3xl border border-white/5 shadow-inner"
            dangerouslySetInnerHTML={{ __html: svg }} 
        />
  );
};
