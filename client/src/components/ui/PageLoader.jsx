import { cn } from "../../lib/utils";

export default function PageLoader({ className }) {
  return (
    <div className={cn("min-h-[60vh] flex items-center justify-center bg-white dark:bg-navy transition-colors duration-300", className)}>
      <div className="text-center">
        <div className="pencil-wrapper mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" className="pencil text-bloom-400 dark:text-bloom-300">
            <defs>
              <clipPath id="pencil-eraser">
                <rect height="30" width="30" ry="5" rx="5" />
              </clipPath>
            </defs>
            <circle
              transform="rotate(-113,100,100)"
              strokeLinecap="round"
              strokeDashoffset="439.82"
              strokeDasharray="439.82 439.82"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              r="70"
              className="pencil__stroke"
            />
            <g transform="translate(100,100)" className="pencil__rotate">
              <g fill="none">
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="402"
                  strokeDasharray="402.12 402.12"
                  strokeWidth="30"
                  stroke="#d4879a"
                  r="64"
                  className="pencil__body1"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="465"
                  strokeDasharray="464.96 464.96"
                  strokeWidth="10"
                  stroke="#e8a7b8"
                  r="74"
                  className="pencil__body2"
                />
                <circle
                  transform="rotate(-90)"
                  strokeDashoffset="339"
                  strokeDasharray="339.29 339.29"
                  strokeWidth="10"
                  stroke="#c06e83"
                  r="54"
                  className="pencil__body3"
                />
              </g>
              <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
                <g className="pencil__eraser-skew">
                  <rect height="30" width="30" ry="5" rx="5" fill="#f0c0cc" />
                  <rect clipPath="url(#pencil-eraser)" height="30" width="5" fill="#d4879a" />
                  <rect height="20" width="30" fill="#faf3f0" />
                  <rect height="20" width="15" fill="#e8ddd8" />
                  <rect height="20" width="5" fill="#f1e8e3" />
                  <rect height="2" width="30" y="6" fill="rgba(30,25,35,0.12)" />
                  <rect height="2" width="30" y="13" fill="rgba(30,25,35,0.12)" />
                </g>
              </g>
              <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
                <polygon points="15 0,30 30,0 30" fill="#e8c4a0" />
                <polygon points="15 0,6 30,0 30" fill="#d4a87a" />
                <polygon points="15 0,20 10,10 10" fill="#1e1923" />
              </g>
            </g>
          </svg>
        </div>
        <p className="font-serif text-lg text-navy/60 dark:text-cream-100/60">PureBloom Beauty</p>
        <p className="text-xs text-navy/30 dark:text-cream-100/30 font-sans mt-1">Loading...</p>
      </div>
    </div>
  );
}
