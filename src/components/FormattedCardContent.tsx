import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidRenderer } from './MermaidRenderer';

interface Props {
    content: string;
}

export const FormattedCardContent: React.FC<Props> = ({ content }) => {
    return (
        <div className="formatted-card-content prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-primary max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Custom mapping for code blocks to support Mermaid
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isMermaid = match && match[1] === 'mermaid';

                        if (!inline && isMermaid) {
                            return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
                        }

                        return (
                            <code 
                                className={`${className} ${inline ? 'bg-white/10 px-1.5 py-0.5 rounded text-primary border border-white/5' : ''}`} 
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    // Enhance headers with icons or specific styling if they match target names
                    h3({ node, children, ...props }: any) {
                        const text = String(children);
                        let className = "text-xl font-black mt-10 mb-4 flex items-center gap-2";

                        if (text.includes('⚡') || text.toLowerCase().includes('esencia')) {
                            className += " text-blue-400";
                        } else if (text.includes('📊') || text.toLowerCase().includes('diagrama')) {
                            className += " text-emerald-400";
                        } else if (text.includes('🔍') || text.toLowerCase().includes('ejemplo')) {
                            className += " text-purple-400";
                        } else if (text.includes('⚠️') || text.toLowerCase().includes('trampa')) {
                            className += " text-amber-400 p-4 bg-amber-500/5 border-l-2 border-amber-500/50 rounded-r-xl my-6";
                        } else if (text.includes('🔗') || text.toLowerCase().includes('conexiones')) {
                            className += " text-cyan-400";
                        } else if (text.includes('🧠') || text.toLowerCase().includes('recall')) {
                            className += " text-rose-400 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl my-8 ring-1 ring-rose-500/10";
                        }

                        return <h3 className={className} {...props}>{children}</h3>;
                    },
                    // Style metadata line if it's the first paragraph or contains typical metadata tokens
                    p({ node, children, ...props }: any) {
                        const text = String(children);
                        const isMetadata = text.includes('🔷') || (text.includes('|') && (text.includes('XP') || text.includes('Prereqs')));
                        
                        if (isMetadata) {
                            return (
                                <div className="flex flex-wrap items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl my-4 text-[10px] font-black uppercase tracking-widest text-white/60">
                                    {text.split('|').map((part, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {i > 0 && <span className="w-1 h-1 rounded-full bg-white/10" />}
                                            <span className={part.includes('XP') ? 'text-yellow-400' : ''}>{part.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        return <p className="leading-relaxed mb-4" {...props}>{children}</p>;
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
