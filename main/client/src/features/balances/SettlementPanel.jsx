import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"

export function SettlementPanel({ debts, filterMember }) {
    const netBalance = filterMember ? debts.reduce((acc, debt) => {
        if (debt.to === filterMember) return acc + debt.amount
        if (debt.from === filterMember) return acc - debt.amount
        return acc
    }, 0) : null

    return (
        <div className="settlement-container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <AccountBalanceWalletOutlinedIcon style={{ fontSize: "24px", color: "var(--primary)" }} />
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>
                        Settlements
                    </h2>
                </div>

                {filterMember && Math.abs(netBalance) >= 0.01 && (
                    <div style={{
                        background: netBalance > 0 ? "rgba(20, 184, 166, 0.1)" : "rgba(244, 63, 94, 0.1)",
                        padding: "16px",
                        borderRadius: "16px",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        border: `1px solid ${netBalance > 0 ? 'var(--secondary)' : 'var(--accent)'}30`
                    }}>
                        {netBalance > 0 ?
                            <TrendingUpIcon style={{ color: "var(--secondary)" }} /> :
                            <TrendingDownIcon style={{ color: "var(--accent)" }} />
                        }
                        <div>
                            <div style={{ fontSize: "12px", fontWeight: "700", color: netBalance > 0 ? "var(--secondary)" : "var(--accent)", textTransform: "uppercase" }}>
                                {netBalance > 0 ? "You are owed" : "You owe"}
                            </div>
                            <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)" }}>
                                ₹{Math.abs(netBalance).toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>
                )}

                <div className="settlement-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {debts.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: "14px" }}>
                            🎉 Everyone is settled up!
                        </div>
                    ) : (
                        debts.map((debt, index) => {
                            const isReceiving = filterMember && debt.to === filterMember
                            const isPaying = filterMember && debt.from === filterMember

                            return (
                                <div key={index} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "14px",
                                    borderRadius: "14px",
                                    background: "var(--background)",
                                    border: "1px solid var(--border)"
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                        <div style={{ fontSize: "14px", color: "var(--text-main)" }}>
                                            <span style={{ fontWeight: "700" }}>{isReceiving ? debt.to : debt.from}</span>
                                            <span style={{ margin: "0 6px", fontSize: "12px", color: "var(--text-muted)" }}>owes</span>
                                            <span style={{ fontWeight: "700" }}>{isReceiving ? debt.from : debt.to}</span>
                                        </div>
                                        <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                                            Direct Settlement
                                        </span>
                                    </div>

                                    <div style={{
                                        fontSize: "16px",
                                        fontWeight: "800",
                                        color: isReceiving ? "var(--secondary)" : (isPaying ? "var(--accent)" : "var(--text-main)")
                                    }}>
                                        {isReceiving ? "+" : (isPaying ? "-" : "")}₹{debt.amount.toLocaleString('en-IN')}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}