//get the words
let words = []
let letterObjects
let wordContainer = document.querySelector('.words')
async function getWords(){
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=10')
    words = await res.json()
}

//optimize the words and show it
async function show(){
    words = []
    let spans = []
    await getWords()
    words = words.join(' ').split('')
    words.forEach(letter => {
        spans.push(`<span>${letter}</span>`)
    })
    wordContainer.innerHTML = spans.join('')
    letterObjects = document.querySelectorAll('.words span')
    wordContainer.firstChild.classList.add('active')
}
show()

//start typing
let userInput = []
let currentPosition = 0
let lastPosition = -1
window.addEventListener('keydown',(e)=>{
    console.log(e.key)
    userInput.push(e.key)
    if(userInput[userInput.length - 1] == words[currentPosition]){
        currentPosition++
        lastPosition++
        letterObjects[lastPosition].classList.remove('active')
        letterObjects[currentPosition].classList.add('active')
    }
})
//increase font size
let inc = document.querySelector('.increase')
let dec = document.querySelector('.decrease')
let font = 34
inc.addEventListener('click',()=>{
    if(font < 50){
        font += 2
        wordContainer.style.fontSize = `${font}px`
        checkColor(dec,inc,font)
    }
})
dec.addEventListener('click',()=>{
    if(font > 22){
        font -= 2
        wordContainer.style.fontSize = `${font}px`
        checkColor(dec,inc,font)
    }
})
function checkColor(left,right,size){
    if(size >= 50) right.classList.add('unactive')
    else if(size <= 22) left.classList.add('unactive')
    else {
        right.classList.remove('unactive')
        left.classList.remove('unactive')
    }
}
