import { updateGoal, deleteGoal, setActiveGoal } from "./saving.js";

const list = document.querySelector('.goals_list')

list.addEventListener('click', (e) => {
    const action = e.target.dataset.manage
    const li = e.target.closest('[data-goal-id]')
    const id = e.target.closest('[data-goal-id]').dataset.goalId

    if (action == 'edit') {
        editGoal(li)
    }

    if (action == 'exclude') {
        excludeGoal(id, li)
    }

    if (action == 'save') {
        saveGoal(id, li)
    }
})

function editGoal(goal) {
    const actions = goal.querySelector('.manage_actions')
    const nameElem = goal.querySelector('.goal_name')
    const amountElem = goal.querySelector('.goal_amount')

    const nameInput = document.createElement('input')
    nameInput.value = nameElem.textContent
    nameInput.className = 'goal_input_name'

    const amountInput = document.createElement('input')
    amountInput.type = 'number'
    amountInput.value = parseFloat(amountElem.textContent.replace('R$', ''))
    amountInput.min = 0
    amountInput.required = true
    amountInput.className = 'goal_input_amount'

    nameElem.replaceWith(nameInput)
    amountElem.replaceWith(amountInput)

    actions.classList.add('edit')
}

function excludeGoal(id, goal) {
    deleteGoal(id)

    goal.remove()
}

function saveGoal(id, goal) {
    const actions = goal.querySelector('.manage_actions')
    const nameInput = goal.querySelector('.goal_input_name')
    const amountInput = goal.querySelector('.goal_input_amount')

    if (isNaN(amountInput.value) || amountInput.value <= 0) return

    updateGoal(id, nameInput.value, parseFloat(amountInput.value))

    const nameElem = document.createElement('div')
    nameElem.className = 'goal_name'
    nameElem.textContent = nameInput.value

    const amountElem = document.createElement('div')
    amountElem.className = 'goal_amount'
    amountElem.textContent = `R$${parseFloat(amountInput.value).toFixed(2)}`

    nameInput.replaceWith(nameElem)
    amountInput.replaceWith(amountElem)

    actions.classList.remove('edit')
}
