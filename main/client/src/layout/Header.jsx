import { Logo } from "./Logo"

export function Header({ groupTotal }) {
    return (
        <header className="app-header glass-panel" style={{
            margin: "20px 32px 0 32px",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10
        }}>
            <div className="header-left" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Logo size={40} />
                </div>
                <span className="header-title title-gradient" style={{ fontSize: "24px" }}>
                    SplitEasy
                </span>
            </div>

            <div className="header-right">
                <div className="header-group-total">
                    <span className="group-total-label">GROUP TOTAL</span>
                    <span className="group-total-amount">
                        ₹{groupTotal ? groupTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : "0.00"}
                    </span>
                </div>
            </div>

            <style jsx>{`
                .group-total-label {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    display: block;
                    text-align: right;
                }
                .group-total-amount {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--text-main);
                    display: block;
                }
            `}</style>
        </header>
    )
}