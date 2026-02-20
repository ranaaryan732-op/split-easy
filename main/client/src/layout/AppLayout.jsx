
export function AppLayout({ left, center, right }) {
    return (
        <main className="app-main" style={{
            display: "flex",
            flexDirection: "row",
            padding: "32px",
            gap: "24px",
            minHeight: "calc(100vh - 120px)"
        }}>
            <div className="left-column" style={{ width: "300px" }}>
                {left}
            </div>

            <div className="center-column" style={{ flex: 1, minWidth: 0 }}>
                {center}
            </div>

            <div className="right-column" style={{ width: "340px" }}>
                {right}
            </div>
        </main>
    )
}