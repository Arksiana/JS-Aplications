// initialization
// - find relevant sections
// - detach section from DOM
import { e, showView } from './dom.js'
import { showCreate } from './create.js'
import { showDetails } from './details.js'

let movieCache = null
let lastLoaded = null
const maxAge = 60000

const section = document.getElementById('home-page')
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center')
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate()
})

catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target
    if(target.tagName == 'BUTTON'){
        target = target.parentElement
    }
    if(target.tagName == 'A'){
        const id = target.dataset.id
        showDetails(id)
    }
})

section.remove()

// display logic
export function showHome() {
    showView(section)
    getMovies()
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'))
    const now = Date.now()
    if(movieCache == null || (now - lastLoaded) > maxAge) {
        lastLoaded = now
        const res = await fetch('http://localhost:3030/data/movies')
        const data = await res.json()
        movieCache = data
    }


    catalog.replaceChildren(...movieCache.map(createMovieCard))
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' })
    element.innerHTML = 
    `<img
    class="card-img-top"
    src="${movie.img}"
    alt="Card image cap"
    width="400"
    />
    <div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
    <a data-id=${movie._id} href="#">
        <button type="button" class="btn btn-info">
        Details
        </button>
    </a>
    </div>`

    return element
}

/*
<div class="card mb-4">
    <img
    class="card-img-top"
    src="https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg"
    alt="Card image cap"
    width="400"
    />
    <div class="card-body">
    <h4 class="card-title">Wonder Woman 1984</h4>
    </div>
    <div class="card-footer">
    <a href="#/details/6lOxMFSMkML09wux6sAF">
        <button type="button" class="btn btn-info">
        Details
        </button>
    </a>
    </div>
    </div>
*/
