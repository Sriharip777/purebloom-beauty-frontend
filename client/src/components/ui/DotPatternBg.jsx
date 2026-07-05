export default function DotPatternBg({ dotColor = "#F4C6CE", className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
