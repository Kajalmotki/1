import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Moon, ShoppingBag, User } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Sparkles, label: 'Horoscope', path: '/horoscope' },
        { icon: Moon, label: 'Tarot', path: '/tarot' },
        { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
            {navItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-colors duration-300 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-muted hover:text-white'
                        }`
                    }
                >
                    <item.icon size={24} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
