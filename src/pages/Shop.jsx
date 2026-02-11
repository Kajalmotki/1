import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1, name: 'Amethyst Cluster', category: 'Crystals', price: 29.99, rating: 4.8, reviews: 124, color: '#9B59B6',
        description: 'A stunning natural amethyst cluster to enhance intuition and spiritual awareness. Perfect for meditation spaces.'
    },
    {
        id: 2, name: 'Rose Quartz Sphere', category: 'Crystals', price: 34.99, rating: 4.9, reviews: 89, color: '#E8A0BF',
        description: 'Polished rose quartz sphere radiating love energy. Ideal for heart chakra work and attracting love.'
    },
    {
        id: 3, name: 'Celestial Tarot Deck', category: 'Tarot', price: 24.99, rating: 4.7, reviews: 256, color: '#6C63FF',
        description: 'Beautifully illustrated 78-card tarot deck with gold foil accents and guidebook included.'
    },
    {
        id: 4, name: 'Sage Bundle', category: 'Ritual', price: 12.99, rating: 4.6, reviews: 342, color: '#2ECC71',
        description: 'Ethically sourced white sage smudge bundle for space clearing and energy purification rituals.'
    },
    {
        id: 5, name: 'Zodiac Necklace', category: 'Jewelry', price: 39.99, rating: 4.8, reviews: 178, color: '#D4AF37',
        description: 'Handcrafted 18k gold-plated zodiac constellation necklace. Available for all 12 signs.'
    },
    {
        id: 6, name: 'Moon Phase Journal', category: 'Books', price: 19.99, rating: 4.9, reviews: 203, color: '#34495E',
        description: 'Leather-bound journal with moon phase calendar and guided prompts for lunar manifestation work.'
    },
    {
        id: 7, name: 'Obsidian Mirror', category: 'Crystals', price: 44.99, rating: 4.5, reviews: 67, color: '#1A1A2E',
        description: 'Polished obsidian scrying mirror for deep meditation, divination, and shadow work.'
    },
    {
        id: 8, name: 'Chakra Candle Set', category: 'Ritual', price: 27.99, rating: 4.7, reviews: 156, color: '#FF6B6B',
        description: 'Set of 7 hand-poured soy candles, each infused with essential oils corresponding to the seven chakras.'
    },
];

const categories = ['All', 'Crystals', 'Tarot', 'Ritual', 'Jewelry', 'Books'];

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState(new Set());
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="space-y-5 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
                <Link to="/" className="p-2 rounded-full bg-surface/60 border border-white/5">
                    <ArrowLeft size={18} className="text-muted" />
                </Link>
                <h1 className="text-xl font-serif text-white">Mystic Shop</h1>
                <button className="p-2 rounded-full bg-surface/60 border border-white/5 relative">
                    <ShoppingCart size={18} className="text-muted" />
                </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                                ? 'bg-primary text-background font-semibold'
                                : 'bg-surface/40 text-muted border border-white/5 hover:border-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3">
                {filtered.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-surface/40 rounded-2xl border border-white/5 overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
                    >
                        {/* Product Image Placeholder */}
                        <div
                            className="h-36 flex items-center justify-center relative"
                            style={{ background: `linear-gradient(135deg, ${product.color}30, ${product.color}10)` }}
                        >
                            <span className="text-4xl opacity-60">✦</span>
                            <button
                                onClick={(e) => toggleFavorite(product.id, e)}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm"
                            >
                                <Heart
                                    size={14}
                                    className={favorites.has(product.id) ? 'text-red-400 fill-red-400' : 'text-white/50'}
                                />
                            </button>
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
                            <p className="text-xs text-muted mt-0.5">{product.category}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-primary font-semibold text-sm">${product.price}</span>
                                <div className="flex items-center gap-0.5">
                                    <Star size={10} fill="currentColor" className="text-amber-400" />
                                    <span className="text-[10px] text-muted">{product.rating}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={e => e.stopPropagation()}
                            className="w-full bg-surface rounded-t-3xl p-6 space-y-4 max-h-[75vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-serif text-white">{selectedProduct.name}</h2>
                                    <p className="text-xs text-muted">{selectedProduct.category}</p>
                                </div>
                                <button onClick={() => setSelectedProduct(null)} className="p-1.5 rounded-full bg-white/5">
                                    <X size={18} className="text-muted" />
                                </button>
                            </div>

                            <div
                                className="h-48 rounded-2xl flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${selectedProduct.color}30, ${selectedProduct.color}10)` }}
                            >
                                <span className="text-6xl opacity-40">✦</span>
                            </div>

                            <p className="text-sm text-white/70 leading-relaxed">{selectedProduct.description}</p>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Star size={14} fill="currentColor" className="text-amber-400" />
                                    <span className="text-sm text-white">{selectedProduct.rating}</span>
                                    <span className="text-xs text-muted">({selectedProduct.reviews} reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <span className="text-2xl font-serif text-primary">${selectedProduct.price}</span>
                                <button className="flex-1 py-3 bg-gradient-to-r from-primary to-amber-500 text-background font-semibold rounded-xl active:scale-[0.97] transition-transform">
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;
