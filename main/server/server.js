import express from "express"
import cors from "cors"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())


const dataDir = path.join(__dirname, "data")
const membersFile = path.join(dataDir, "members.json")
const expensesFile = path.join(dataDir, "expenses.json")


if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
}


function readJsonFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]))
        return []
    }
    const data = fs.readFileSync(filePath, "utf-8")
    if (!data || data.trim() === "") {
        fs.writeFileSync(filePath, JSON.stringify([]))
        return []
    }
    try {
        return JSON.parse(data)
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e)
        return []
    }
}


function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}




app.get("/members", (req, res) => {
    const members = readJsonFile(membersFile)
    res.json(members)
})


app.post("/members", (req, res) => {
    const { name } = req.body

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Member name is required" })
    }

    const members = readJsonFile(membersFile)


    const alreadyExists = members.find(
        (m) => m.name.toLowerCase() === name.trim().toLowerCase()
    )
    if (alreadyExists) {
        return res.status(400).json({ error: "Member already exists" })
    }

    const newMember = {
        id: Date.now(),
        name: name.trim()
    }

    members.push(newMember)
    writeJsonFile(membersFile, members)
    res.status(201).json(newMember)
})




app.get("/expenses", (req, res) => {
    const expenses = readJsonFile(expensesFile)
    res.json(expenses)
})


app.post("/expenses", (req, res) => {
    const { description, amount, paidBy } = req.body

    if (!description || !amount || !paidBy) {
        return res.status(400).json({ error: "description, amount and paidBy are required" })
    }

    if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number" })
    }

    const members = readJsonFile(membersFile)
    const memberExists = members.find((m) => m.name === paidBy)
    if (!memberExists) {
        return res.status(400).json({ error: "paidBy member does not exist" })
    }

    const expenses = readJsonFile(expensesFile)

    const newExpense = {
        id: Date.now(),
        description: description.trim(),
        amount: Number(amount),
        paidBy: paidBy,
        date: new Date().toISOString(),
        splitAmong: members.map((m) => m.name)
    }

    expenses.push(newExpense)
    writeJsonFile(expensesFile, expenses)
    res.status(201).json(newExpense)
})




app.get("/debts", (req, res) => {
    const members = readJsonFile(membersFile)
    const expenses = readJsonFile(expensesFile)


    const netOwes = {}

    members.forEach((m) => {
        netOwes[m.name] = {}
        members.forEach((m2) => {
            if (m.name !== m2.name) {
                netOwes[m.name][m2.name] = 0
            }
        })
    })


    expenses.forEach((expense) => {
        const payer = expense.paidBy
        const splitMembers = expense.splitAmong
        const splitCount = splitMembers.length
        const perPerson = expense.amount / splitCount

        splitMembers.forEach((person) => {
            if (person !== payer) {
                netOwes[person][payer] += perPerson
            }
        })
    })


    const debts = []
    const processed = new Set()

    members.forEach((m1) => {
        members.forEach((m2) => {
            if (m1.name === m2.name) return
            const pairKey = [m1.name, m2.name].sort().join("-")
            if (processed.has(pairKey)) return
            processed.add(pairKey)

            const aOwesB = netOwes[m1.name][m2.name] || 0
            const bOwesA = netOwes[m2.name][m1.name] || 0
            const net = aOwesB - bOwesA

            if (net > 0) {

                debts.push({
                    from: m1.name,
                    to: m2.name,
                    amount: Math.round(net * 100) / 100
                })
            } else if (net < 0) {

                debts.push({
                    from: m2.name,
                    to: m1.name,
                    amount: Math.round(Math.abs(net) * 100) / 100
                })
            }
        })
    })

    res.json(debts)
})




app.get("/transactions", (req, res) => {
    const expenses = readJsonFile(expensesFile)
    res.json(expenses)
})


app.listen(4000, () => {
    console.log("Server is running on port 4000")
})