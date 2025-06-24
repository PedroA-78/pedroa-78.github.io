const container = document.querySelector('.stars')

function createStar() {
    const star = document.createElement('span')
    star.classList.add('star')

    star.style.top = `${getRandomRange(5, 90)}%`
    star.style.left = `${getRandomRange(5, 90)}%`
    star.style.animationDelay = `${getRandomRange(1, 5)}s`

    container.appendChild(star)

    star.addEventListener('animationend', () => {
        star.remove()
        createStar()
    })
}


function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function starsInit(quantity) {
    for (let i = 0; i < quantity; i++) {
        createStar()
    }
}

export { starsInit }