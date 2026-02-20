import { useState, useEffect } from "react"
import { SettlementPanel } from "../features/balances/SettlementPanel"
import { ExpensesPanel } from "../features/expenses/ExpensesPanel"
import { MembersSidebar } from "../features/members/MembersSidebar"
import { AppLayout } from "../layout/AppLayout"
import { Header } from "../layout/Header"
import { FloatingAddButton } from "../layout/FloatingAddButton"
import { AddExpenseModal } from "../features/expenses/AddExpenseModal"
import { api } from "../services/api"

export function DashBoardPage() {
    const [members, setMembers] = useState([])
    const [expenses, setExpenses] = useState([])
    const [debts, setDebts] = useState([])
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [filterMember, setFilterMember] = useState("")

    const loadData = async () => {
        try {
            const [membersData, expensesData, debtsData] = await Promise.all([
                api.getMembers(),
                api.getExpenses(),
                api.getDebts()
            ])
            setMembers(membersData)
            setExpenses(expensesData)
            setDebts(debtsData)
        } catch (err) {
            console.error("Error loading dashboard data:", err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleAddMember = async (name) => {
        try {
            await api.addMember(name)
            await loadData()
        } catch (err) {
            alert(err.message)
        }
    }

    const handleAddExpense = async (expenseData) => {
        try {
            await api.addExpense(expenseData)
            await loadData()
            setShowAddExpense(false)
        } catch (err) {
            alert(err.message)
        }
    }

    const groupTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0)

    const filteredDebts = filterMember
        ? debts.filter((d) => d.from === filterMember || d.to === filterMember)
        : debts

    const filteredExpenses = filterMember
        ? expenses.filter(
            (e) =>
                e.paidBy === filterMember ||
                (e.splitAmong && e.splitAmong.includes(filterMember))
        )
        : expenses

    return (
        <div className="dashboard-root">
            <Header groupTotal={groupTotal} />

            <AppLayout
                left={
                    <MembersSidebar
                        members={members}
                        onAddMember={handleAddMember}
                        debts={debts}
                        filterMember={filterMember}
                        onFilterMember={setFilterMember}
                    />
                }
                center={
                    <ExpensesPanel
                        expenses={filteredExpenses}
                        filterMember={filterMember}
                    />
                }
                right={
                    <SettlementPanel
                        debts={filteredDebts}
                        filterMember={filterMember}
                    />
                }
            />

            <FloatingAddButton onClick={() => setShowAddExpense(true)} />

            {showAddExpense && (
                <AddExpenseModal
                    members={members}
                    onAdd={handleAddExpense}
                    onClose={() => setShowAddExpense(false)}
                />
            )}
        </div>
    )
}