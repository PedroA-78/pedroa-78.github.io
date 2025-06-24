import { starsInit } from "./background.js";
import { modalInit } from "./modal.js";
import { initSaving, createGoal, getGoals, addValue, getTotal, getHistory, formatDate } from "./saving.js";

window.addEventListener('DOMContentLoaded', () => {
    starsInit(15)
    modalInit()
    initSaving()

    setupActions()
    setupHistory()
    setupManage()
})

function setupActions() {
    const inputs = document.querySelectorAll('[data-input]')
    const actions = document.querySelectorAll('[data-action]')

    const inputMap = {}
    const actionMap = {}

    inputs.forEach(input => {
        const key = input.dataset.input
        inputMap[key] = input
    })

    actions.forEach(button => {
        const key = button.dataset.action
        actionMap[key] = button
    })

    actionMap['add'].addEventListener('click', () => {
        const id = document.querySelector('.active_goal').value
        const amount = parseFloat(inputMap['add'].value)

        if (isNaN(amount) || amount <= 0) return

        addValue(id, amount)

        inputMap['add'].value = ''
        document.querySelector('.amount').innerHTML = `R$${getTotal().toFixed(2)} <span>economizados</span>`
    })

    actionMap['save'].addEventListener('click', () => {
        const goal = inputMap['goal_name'].value
        const amount = inputMap['goal_amount'].value

        if (isNaN(amount) || amount <= 0) return

        createGoal(goal, parseFloat(amount))

        inputMap['goal_name'].value = ''
        inputMap['goal_amount'].value = ''
    })
}

function setupHistory() {
    const history = document.getElementById('history')
    const list = document.querySelector('.history_list')
    const no_registers = document.querySelector('#modal_history .no_registers')

    history.addEventListener('click', () => {
        const registers = getHistory()

        list.innerHTML = ''

        if (!registers || registers.length === 0) {
            no_registers.classList.add('show')
            return
        } else {
            no_registers.classList.remove('show')
        }

        registers?.forEach(register => {
            const html = `
                <li>
                    <div>R$${register.value}</div>
                    <div>${register.name}</div>
                    <div>${formatDate(register.date)}</div>
                </li>
            `

            const temp = document.createElement('template')
            temp.innerHTML = html.trim()
            const li = temp.content.firstElementChild
            list.appendChild(li)
        })
    })
}

function setupManage() {
    const manage = document.getElementById('manage')
    const list = document.querySelector('.goals_list')
    const no_registers = document.querySelector('#modal_manage .no_registers')

    manage.addEventListener('click', () => {
        const goals = getGoals()

        list.innerHTML = ''

        if (!goals || goals.length === 0) {
            no_registers.classList.add('show')
            return
        } else {
            no_registers.classList.remove('show')
        }

        goals.forEach(goal => {
            const html = `
                <li data-goal-id="${goal.id}">
                    <div class="goal_name">${goal.name}</div>
                    <div class="goal_amount">R$${goal.amount}</div>
                    <div class="manage_actions">
                        <button data-manage="edit">Editar</button>
                        <button data-manage="exclude">Excluir</button>
                        <button class="action_save" data-manage="save">Salvar</button>
                    </div>
                </li>
            `

            const temp = document.createElement('template')
            temp.innerHTML = html.trim()
            const li = temp.content.firstElementChild
            list.appendChild(li)
        });
    })
}