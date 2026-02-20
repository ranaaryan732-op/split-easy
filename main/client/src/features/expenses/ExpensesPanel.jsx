import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined"
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"

const getExpenseIcon = (description) => {
    const desc = description.toLowerCase()

    const iconStyle = { fontSize: "24px" }

    if (desc.includes("dinner") || desc.includes("food") || desc.includes("lunch") || desc.includes("restaurant") || desc.includes("pizza")) {
        return { icon: <RestaurantOutlinedIcon style={iconStyle} />, color: "#f97316" }
    }
    if (desc.includes("grocer") || desc.includes("shop") || desc.includes("market") || desc.includes("blinkit") || desc.includes("zepto")) {
        return { icon: <ShoppingCartOutlinedIcon style={iconStyle} />, color: "#14b8a6" }
    }
    if (desc.includes("electric") || desc.includes("bill") || desc.includes("utility") || desc.includes("water") || desc.includes("gas") || desc.includes("recharge")) {
        return { icon: <BoltOutlinedIcon style={iconStyle} />, color: "#0ea5e9" }
    }
    if (desc.includes("taxi") || desc.includes("cab") || desc.includes("uber") || desc.includes("travel") || desc.includes("auto")) {
        return { icon: <LocalTaxiOutlinedIcon style={iconStyle} />, color: "#6366f1" }
    }
    return { icon: <ReceiptLongOutlinedIcon style={iconStyle} />, color: "#64748b" }
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export function ExpensesPanel({ expenses, filterMember }) {
    const sortedExpenses = [...expenses].reverse()

    return (
        <div className="premium-card" style={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>
                    {filterMember ? `${filterMember}'s Activity` : "Recent Activity"}
                </h2>
                <div style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}>
                    View All
                </div>
            </div>

            <div className="expenses-list" style={{ display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto" }}>
                {sortedExpenses.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                        <ReceiptLongOutlinedIcon style={{ fontSize: "48px", opacity: 0.2, marginBottom: "12px" }} />
                        <p style={{ fontSize: "14px" }}>No expenses found yet.</p>
                    </div>
                ) : (
                    sortedExpenses.map((expense) => {
                        const { icon, color } = getExpenseIcon(expense.description)
                        return (
                            <div key={expense.id} className="expense-item" style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "12px",
                                borderRadius: "16px",
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                transition: "transform 0.2s ease"
                            }}>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "14px",
                                    backgroundColor: `${color}15`,
                                    color: color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}>
                                    {icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-main)" }}>
                                        {expense.description}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                                        <span style={{ fontWeight: "700", color: "var(--primary)" }}>{expense.paidBy}</span>
                                        <span>•</span>
                                        <span>{formatDate(expense.date)}</span>
                                    </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>
                                        ₹{expense.amount.toLocaleString('en-IN')}
                                    </div>
                                    <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                                        Settled
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <style jsx>{`
                .expense-item:hover {
                    transform: scale(1.01);
                    border-color: var(--primary);
                }
            `}</style>
        </div>
    )
}

