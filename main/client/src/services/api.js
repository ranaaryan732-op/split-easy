const API_URL = "http://localhost:4000";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    getMembers: () => fetch(`${API_URL}/members`).then(handleResponse),
    getExpenses: () => fetch(`${API_URL}/expenses`).then(handleResponse),
    getDebts: () => fetch(`${API_URL}/debts`).then(handleResponse),

    addMember: (name) => fetch(`${API_URL}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    }).then(handleResponse),

    addExpense: (expenseData) => fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData)
    }).then(handleResponse)
};
