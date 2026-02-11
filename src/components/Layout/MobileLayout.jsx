import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const MobileLayout = () => {
    return (
        <div className="min-h-screen bg-background text-text font-sans relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
            </div>

            {/* Main Content Area */}
            <main className="pb-24 px-4 pt-6 relative z-10">
                <Outlet />
            </main>

            <BottomNav />
        </div>
    );
};

export default MobileLayout;
