const modals = document.querySelectorAll('.modal')

function modalInit() {
    const triggers = document.querySelectorAll('[data-modal]')

    triggers.forEach(trigger => {
        const targetId = trigger.dataset.modal
        const targetModal = document.getElementById(targetId)

        // console.log(`${targetId}, ${targetModal}`)
        trigger.addEventListener('click', () => {
            targetModal?.classList.add('show')
        })
    })

    modals.forEach(setupClose)
}

function setupClose(modal) {
    const button = modal.querySelector('.modal_close')
    const overlay = modal.querySelector('.modal_overlay')

    const close = () => modal.classList.remove('show')

    button?.addEventListener('click', close)
    overlay?.addEventListener('click', close)
}

export { modalInit }
