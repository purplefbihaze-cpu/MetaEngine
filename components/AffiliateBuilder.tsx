
import React, { useState } from 'react';
import { generateAffiliateStrategies, AffiliateStrategy } from '../services/geminiService';
import { Button, Badge } from './ui/Components';
import { Megaphone, Loader2, Layout, Image as ImageIcon, Mail, Copy, CheckCircle, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { HoloCube } from './ui/Visuals';

export const AffiliateBuilder: React.FC = () => {
    const [niche, setNiche] = useState('');
    const [productType, setProductType] = useState('Digital Course');
    const [loading, setLoading] = useState(false);
    const [strategies, setStrategies] = useState<AffiliateStrategy[]>([]);
    const [selectedStrategy, setSelectedStrategy] = useState<AffiliateStrategy | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!niche) return;
        setLoading(true);
        const results = await generateAffiliateStrategies(niche, productType);
        setStrategies(results);
        setLoading(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex h-full bg-nexus-950 overflow-hidden">
            {/* Left Config Panel */}
            <div className="w-80 border-r border-white/5 bg-nexus-900/30 p-6 flex flex-col gap-6 hidden xl:flex">
                <div className="flex items-center gap-2 mb-4">
                    <Megaphone className="text-pink-500" />
                    <div>
                        <h2 className="text-lg font-bold text-white leading-none">Affiliate<br /><span className="text-xs font-normal text-gray-400">Engine</span></h2>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 font-mono uppercase mb-2 block">Trend / Niche</label>
                        <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Keto for Seniors, AI Trading"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-pink-500 outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-mono uppercase mb-2 block">Product Type</label>
                        <select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-pink-500 outline-none"
                        >
                            <option>Digital Course</option>
                            <option>SaaS / Software</option>
                            <option>Physical Product</option>
                            <option>Coaching / Service</option>
                            <option>Newsletter</option>
                        </select>
                    </div>

                    <Button onClick={handleGenerate} className="w-full mt-4 bg-pink-600 hover:bg-pink-500 text-white" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2"><TrendingUp size={14} /> Analyze & Generate</span>}
                    </Button>
                </div>

                <div className="mt-auto bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Model Status</h4>
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Gemini 3.0 Pro Active
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-grid-pattern">
                {!strategies.length && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <HoloCube />
                        <h3 className="text-2xl font-bold text-white mt-6">Waiting for Signal</h3>
                        <p className="text-gray-400 max-w-md mt-2">Enter a trend to generate high-conversion landing pages, ad copy, and image prompts using Gemini 3.0.</p>
                    </div>
                )}

                {loading && (
                    <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4" />
                        <p className="text-pink-400 font-mono animate-pulse">Analyzing Market Sentiment & Creating Assets...</p>
                    </div>
                )}

                {strategies.length > 0 && !selectedStrategy && (
                    <div className="animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Select a Marketing Angle</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {strategies.map((strat, i) => (
                                <div key={i} onClick={() => setSelectedStrategy(strat)} className="bg-nexus-900/60 border border-white/10 p-6 rounded-xl hover:border-pink-500 hover:bg-white/5 cursor-pointer transition-all group">
                                    <Badge colorClass="bg-pink-500/20 text-pink-400 border-pink-500/20 mb-4">ANGLE {i + 1}</Badge>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400">{strat.angle}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3 mb-4">"{strat.headline}"</p>
                                    <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                                        Select Strategy <ArrowRight size={12} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedStrategy && (
                    <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <Button variant="ghost" onClick={() => setSelectedStrategy(null)} className="pl-0 text-gray-500 hover:text-white">← Back to Angles</Button>
                            <div className="flex gap-3">
                                <Button variant="secondary" icon={<Layout size={16} />}>Preview Page</Button>
                                <Button className="bg-pink-600 hover:bg-pink-500" icon={<Copy size={16} />}>Export JSON</Button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Hero Section */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><Target size={16} className="text-pink-400" /> Core Messaging</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">HEADLINE</span>
                                        <div className="text-2xl font-bold text-white">{selectedStrategy.headline}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">SUBHEADLINE</span>
                                        <div className="text-lg text-gray-300">{selectedStrategy.subheadline}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">CALL TO ACTION</span>
                                        <Badge colorClass="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-lg py-1 px-4">{selectedStrategy.cta}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Image Prompts */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><ImageIcon size={16} className="text-cyan-400" /> AI Image Prompts (Midjourney)</h3>
                                <div className="space-y-3">
                                    {selectedStrategy.imagePrompts.map((prompt, i) => (
                                        <div key={i} className="bg-black/40 p-4 rounded border border-white/5 flex justify-between items-center gap-4 group">
                                            <code className="text-xs text-cyan-200 font-mono block">{prompt}</code>
                                            <button onClick={() => handleCopy(prompt)} className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                                                {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Landing Page Copy */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><Layout size={16} className="text-purple-400" /> Landing Page Copy (Gemini 3.0)</h3>
                                <div className="bg-black/40 p-6 rounded border border-white/5 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {selectedStrategy.landingPageCopy}
                                </div>
                            </div>
                            
                             {/* Ad Copy */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><Mail size={16} className="text-yellow-400" /> Cold Outreach / Ad Copy</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-2">EMAIL SUBJECT</span>
                                        <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-white">{selectedStrategy.emailSubject}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-2">SOCIAL AD BODY</span>
                                        <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-gray-300 whitespace-pre-wrap">{selectedStrategy.adCopy}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
