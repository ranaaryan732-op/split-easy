import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

export function AddExpenseModal({ members, onAdd, onClose }) {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [paidBy, setPaidBy] = useState("")

    const handleSubmit = () => {
        if (!description.trim()) return alert("What was this for?")
        if (!amount || amount <= 0) return alert("How much was it?")
        if (!paidBy) return alert("Who paid for this?")

        onAdd({
            description: description.trim(),
            amount: Number(amount),
            paidBy: paidBy
        })
    }

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease-out"
        }}>
            <div className="modal-content premium-card" onClick={(e) => e.stopPropagation()} style={{
                width: "440px", padding: "32px", animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-main)", margin: 0 }}>
                        New Expense
                    </h2>
                    <button onClick={onClose} style={{
                        padding: "8px", borderRadius: "12px", background: "var(--background)", color: "var(--text-muted)",
                        border: "none", cursor: "pointer"
                    }}>
                        <CloseIcon />
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className="input-group">
                        <label className="premium-label">DESCRIPTION</label>
                        <input
                            autoFocus
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Lunch with team..."
                            className="premium-input"
                            style={{ width: "100%", padding: "14px 18px", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--background)", fontSize: "15px", outline: "none" }}
                        />
                    </div>

                    <div className="input-group">
                        <label className="premium-label">AMOUNT (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="premium-input amount-input"
                            style={{ width: "100%", padding: "14px 18px", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--background)", fontSize: "20px", fontWeight: "700", outline: "none" }}
                        />
                    </div>

                    <div className="input-group">
                        <label className="premium-label">PAID BY</label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "8px" }}>
                            {members.map(member => (
                                <div
                                    key={member.id}
                                    onClick={() => setPaidBy(member.name)}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "14px",
                                        border: `1px solid ${paidBy === member.name ? 'var(--primary)' : 'var(--border)'}`,
                                        background: paidBy === member.name ? 'rgba(99, 102, 241, 0.05)' : 'white',
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    <div style={{
                                        width: "24px", height: "24px", borderRadius: "6px",
                                        background: paidBy === member.name ? 'var(--primary)' : 'var(--border)',
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "10px", fontWeight: "800", color: "white"
                                    }}>
                                        {member.name[0].toUpperCase()}
                                    </div>
                                    <span style={{ fontSize: "13px", fontWeight: "600", color: paidBy === member.name ? "var(--primary)" : "var(--text-main)" }}>
                                        {member.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        marginTop: "12px", padding: "16px", borderRadius: "16px", background: "var(--background)",
                        border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px"
                    }}>
                        <div style={{ fontSize: "20px" }}>⚡</div>
                        <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                            Will be split equally among <strong>{members.length} people</strong>.
                            {amount > 0 && <span> Each pays <strong>₹{(amount / members.length).toFixed(1)}</strong></span>}
                        </div>
                    </div>

                    <button className="btn-primary" onClick={handleSubmit} style={{
                        width: "100%", padding: "16px", justifyContent: "center", fontSize: "16px", marginTop: "12px",
                        border: "none", borderRadius: "16px", cursor: "pointer", background: "var(--primary)", color: "white", fontWeight: "700"
                    }}>
                        Add Expense
                    </button>
                </div>
            </div>

            <style>
                {`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                
                .premium-label {
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--text-muted);
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                    display: block;
                }
                .premium-input::placeholder {
                    color: #cbd5e1;
                }
                .premium-input:focus {
                    border-color: var(--primary) !important;
                    background: white !important;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                }
                `}
            </style>
        </div>
    )
}
