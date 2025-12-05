export default class Store {
    constructor() {
        this.groups = this.load('groups') || [];
        this.expenses = this.load('expenses') || [];
        this.currentUser = { id: 'user_1', name: 'You' }; // Mock current user
    }

    load(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Group Methods
    getGroups() {
        return this.groups;
    }

    getGroup(id) {
        return this.groups.find(g => g.id === id);
    }

    createGroup(name, members = []) {
        // Default members include current user
        const newGroup = {
            id: 'g_' + Date.now(),
            name,
            members: [{ ...this.currentUser }, ...members],
            createdAt: new Date().toISOString(),
            currency: '$' // Default currency
        };
        this.groups.push(newGroup);
        this.save('groups', this.groups);
        return newGroup;
    }

    // Expense Methods
    addExpense(expense) {
        const newExpense = {
            id: 'e_' + Date.now(),
            date: new Date().toISOString(),
            ...expense
        };
        this.expenses.push(newExpense);
        this.save('expenses', this.expenses);
        return newExpense;
    }

    getExpensesByGroup(groupId) {
        return this.expenses.filter(e => e.groupId === groupId).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    }

    // Logic for totals
    getBalances(groupId) {
        // TODO: Implement complex split logic calculation here or in a logic module
        // For now, return dummy data or simple calculation
        return {};
    }
}
