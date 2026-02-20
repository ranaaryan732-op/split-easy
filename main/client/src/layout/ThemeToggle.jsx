import { useState, useEffect } from "react"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

export function ThemeToggle() {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.setAttribute("data-theme", savedTheme)
        } else if (prefersDark) {
            setTheme("dark")
            document.documentElement.setAttribute("data-theme", "dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
    }

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle glass-panel"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                padding: "8px",
                color: "var(--text-main)",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === "light" ? (
                <DarkModeOutlinedIcon style={{ fontSize: "20px" }} />
            ) : (
                <LightModeOutlinedIcon style={{ fontSize: "20px", color: "#fbbf24" }} />
            )}

            <style jsx>{`
                .theme-toggle:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateY(-1px);
                    border-color: var(--primary);
                }
            `}</style>
        </button>
    )
}
