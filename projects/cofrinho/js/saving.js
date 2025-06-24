const STORAGE_KEY = 'goals'


function saveGoals(goals) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
}

function getGoals() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

function setActiveGoal(id) {

}

function getActiveGoal() {
    const goals = getGoals()

    for (let goal of goals) {
        if (goal.active) return goal
    }
}

function createGoal(name, amount) {
    if (!name || typeof amount !== 'number' || amount <= 0) return
    
    const goals = getGoals()

    const newGoal = {
        id: Date.now(),
        name,
        amount,
        value: 0,
        active: true,
        history: [],
        createdAt: new Date()
    }
    goals.push(newGoal)
    saveGoals(goals)

    return newGoal.id
}

function addValue(id, value) {
    if (typeof value !== 'number' || value <= 0) return

    const goals = getGoals().map(goal => goal.id == id ? {
        ...goal, 
        value: goal.value += value,
        history: setHistory(goal, value),
    } : goal)

    saveGoals(goals)
}

function updateGoal(id, name, amount) {
    if (typeof amount !== 'number' || amount <= 0 || name == '') return

    const goals = getGoals().map(goal => goal.id == id ? {
        ...goal,
        name,
        amount
    } : goal)

    saveGoals(goals)
}

function deleteGoal(id) {
    const goals = getGoals()
    const updatedGoals = goals.filter(goal => goal.id != id)
    saveGoals(updatedGoals)
}

function getTotal() {
    return getActiveGoal().value
}

function setHistory(goal, value) {
    const history = goal.history || []
    
    history.push({
        value: value,
        date: new Date()
    })

    return history
}

function getHistory() {
    const goal = getActiveGoal()

    if (!goal) return

    const history = goal.history

    const registers = history.map(register => register ? {
        ...register,
        name: goal.name
    } : register)

    return registers
}

function formatDate(d) {
    const date = new Date(d)

    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

function initSaving() {
    const select = document.querySelector('.active_goal')

    if (select) {
        select.value = getActiveGoal()?.id || 0
        document.querySelector('.amount').innerHTML = `R$${getActiveGoal()?.value.toFixed(2) || 0} <span>economizados</span>`
    }
}

export { 
    initSaving,
    createGoal,
    getGoals,
    addValue,
    setActiveGoal,
    updateGoal,
    deleteGoal, 
    getTotal, 
    getHistory, 
    formatDate }

// CRIAR A AREA DE SETAR OUTRA META ATIVA