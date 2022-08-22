const search = document.querySelector(".input-search")
const charactersContainer = document.querySelector(".characters-container")
const lupa = document.querySelector('.lupa')

function getHeroByName(){
    charactersContainer.innerHTML = ""
    const searchValue = search.value
    if (!searchValue.length) return
axios
    .get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchValue}&ts=1&apikey=29cb2821d9c8377c31e68f5310249010&hash=15324eb088f9d94502fc38654ce3a768`)
    .then(function (response) {
        response.data.data.results.forEach(item =>{
            const heros = document.createElement("div")
            heros.classList.add("hero")
            const titleheros = document.createElement("h1")
            const image = document.createElement('img')
            image.src = `${item.thumbnail.path}.${item.thumbnail.extension}`
            image.classList.add("image")
            titleheros.textContent = item.name;
            heros.append(titleheros)
            heros.append(image)
            charactersContainer.append(heros)
            const description = document.createElement('span')
            heros.append(description)
            description.textContent = item.description
            description.classList.add("descrip")
        })
    })
}
let timer;
function debounce(func, timeout = 600) {
    clearTimeout(timer)
    timer = setTimeout(() => {
        func();
    }, timeout);
}

search.addEventListener("input", () => {
    debounce(() => getHeroByName())
})
