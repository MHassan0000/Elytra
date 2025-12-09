interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="lg:hidden w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group relative overflow-hidden"
            aria-label="Toggle menu"
        >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

            {/* Top bar */}
            <span
                className={`w-6 h-0.5 bg-linear-to-r from-violet-400 to-pink-400 rounded-full transition-all duration-300 relative z-10 ${isOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
            />

            {/* Middle bar */}
            <span
                className={`w-6 h-0.5 bg-linear-to-r from-violet-400 to-pink-400 rounded-full transition-all duration-300 relative z-10 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
            />

            {/* Bottom bar */}
            <span
                className={`w-6 h-0.5 bg-linear-to-r from-violet-400 to-pink-400 rounded-full transition-all duration-300 relative z-10 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
            />
        </button>
    );
};

export default HamburgerButton;
