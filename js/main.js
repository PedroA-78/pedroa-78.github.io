window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.hamburger')
    const overlay = document.querySelector('.overlay')
    const links = document.querySelector('.links')

    menu.addEventListener('click', () => {
        toggle()
    })

    links.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggle()
        }
    })

    function toggle() {
        menu.classList.toggle('show')
        overlay.classList.toggle('show')
        links.classList.toggle('show')
    }
})