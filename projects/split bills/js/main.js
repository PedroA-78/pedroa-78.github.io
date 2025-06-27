window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.navigation_menu')
    const overlay = document.querySelector('.navigation_overlay')
    const links = document.querySelector('.navigation_links')

    menu.addEventListener('click', () => {
        overlay.classList.toggle('show')
        links.classList.toggle('show')
    })
})