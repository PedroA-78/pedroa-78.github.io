const emojis = ["💵", "💴", "💶"];
const INITIAL_EMOJI_COUNT = 30
const container = document.querySelector(".money")

for (let i = 0; i < INITIAL_EMOJI_COUNT; i++) {
    spawnEmoji()
}

function spawnEmoji() {
    let span = document.createElement('span')
    span.classList.add('emoji')
    span.textContent = getRandomEmoji()

    setRandomStyle(span)
    container.appendChild(span)

    span.addEventListener("animationend", () => {
        span.remove()
        spawnEmoji()
    })
}

function setRandomStyle(element) {
    element.style.top = `${randomRange(5, 90)}%`
    element.style.left = `${randomRange(5, 90)}%`
    element.style.animationDelay = `${randomRange(0, 5)}s`
    element.style.fontSize = `${randomRange(18, 32)}px`
    element.style.animationDuration = `${randomRange(3, 7)}s`
    element.textContent = getRandomEmoji()
}

function getRandomEmoji() {
    return emojis[randomRange(0, emojis.length - 1)]
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}