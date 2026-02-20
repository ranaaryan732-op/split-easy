import AddIcon from "@mui/icons-material/Add"

export function FloatingAddButton({ onClick }) {
    return (
        <button
            className="floating-add-button"
            onClick={onClick}
            style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 32px rgba(99, 102, 241, 0.4)",
                zIndex: 100,
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
        >
            <AddIcon style={{ fontSize: "32px" }} />

            <style jsx>{`
                .floating-add-button:hover {
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 16px 40px rgba(99, 102, 241, 0.5);
                }
                .floating-add-button:active {
                    transform: translateY(0) scale(0.95);
                }
            `}</style>
        </button>
    )
}

