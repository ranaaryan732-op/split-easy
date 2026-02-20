export function Logo({ size = 24, color = "white" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="12" fill="url(#logo-gradient)" />
            <path
                d="M13 6.5C13 5.67157 12.3284 5 11.5 5C10.6716 5 10 5.67157 10 6.5V10H6.5C5.67157 10 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13H10V16.5C10 17.3284 10.6716 18 11.5 18C12.3284 18 13 17.3284 13 16.5V13H16.5C17.3284 13 18 12.3284 18 11.5C18 10.6716 17.3284 10 16.5 10H13V6.5Z"
                fill="white"
                fillOpacity="0.9"
            />
            {/* Split effect - a diagonal slice or distinctive shape */}
            <path
                d="M18.5 5.5L16 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
            />
            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#14b8a6" />
                </linearGradient>
            </defs>
        </svg>
    )
}
