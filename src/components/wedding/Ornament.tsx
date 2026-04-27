interface OrnamentProps {
  className?: string;
}

export const Ornament = ({ className = "" }: OrnamentProps) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <span className="block h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gold">
      <path
        d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
    <span className="block h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
  </div>
);
