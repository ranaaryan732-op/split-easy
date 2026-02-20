import { useState } from "react"

export function MembersSidebar({ members, onAddMember, debts, filterMember, onFilterMember }) {
    const [inputValue, setInputValue] = useState("")

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddMember(inputValue.trim())
            setInputValue("")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleAdd()
    }

    const calculateBalance = (memberName) => {
        return debts.reduce((acc, d) => {
            if (d.from === memberName) return acc - d.amount
            if (d.to === memberName) return acc + d.amount
            return acc
        }, 0)
    }

    return (
        <div className="members-sidebar" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>
                        Group Members
                    </h2>
                    <span style={{
                        background: "var(--primary)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                    }}>
                        {members.length}
                    </span>
                </div>

                <div className="members-list" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {members.map((member, index) => {
                        const balance = calculateBalance(member.name)
                        const isActive = filterMember === member.name

                        return (
                            <div
                                key={member.id}
                                className={`member-row ${isActive ? 'active' : ''}`}
                                onClick={() => onFilterMember(isActive ? "" : member.name)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "10px",
                                    borderRadius: "14px",
                                    cursor: "pointer",
                                    background: isActive ? "rgba(99, 102, 241, 0.1)" : "transparent",
                                    border: isActive ? "1px solid var(--primary)" : "1px solid transparent",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <div style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "12px",
                                    background: `linear-gradient(135deg, ${['#6366f1', '#14b8a6', '#f43f5e', '#a855f7', '#f97316'][index % 5]}, #ffffff20)`,
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                }}>
                                    {member.name[0].toUpperCase()}
                                </div>

                                <span style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: "500", flex: 1 }}>
                                    {member.name}
                                </span>

                                {Math.abs(balance) >= 0.01 && (
                                    <span style={{
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        color: balance > 0 ? "var(--secondary)" : "var(--accent)"
                                    }}>
                                        {balance > 0 ? "+" : "-"}₹{Math.abs(balance).toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                        QUICK ADD MEMBER
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type name..."
                            style={{
                                flex: 1,
                                padding: "10px 16px",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                fontSize: "14px",
                                outline: "none",
                                background: "var(--background)"
                            }}
                        />
                        <button className="btn-primary" onClick={handleAdd} style={{ padding: "0 14px", borderRadius: "12px" }}>
                            +
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .member-row:hover {
                    background: rgba(99, 102, 241, 0.05);
                }
                input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                }
            `}</style>
        </div>
    )
}

