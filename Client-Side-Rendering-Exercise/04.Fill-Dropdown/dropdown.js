import { html, render } from './node_modules/lit-html/lit-html.js'

const selectTemplate = (items) => html`
<select id="menu">
    ${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}
</select>`

// start:
// add event listeners
// call getData
const root = document.querySelector('div')
const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
document.querySelector('form').addEventListener('submit', addItem)
getData()
// update()

// getData:
// fetch and parse data
// call update
async function getData() {
    const res = await fetch(url)
    const data = await res.json()
    update(Object.values(data))
}


// update
// render template
function update(items) {
    const result = selectTemplate(items)
    render(result, root)
}


// add item:
// read input
// make POST request
// on success, call getData

async function addItem(ev) {
    ev.preventDefault()
    const text = document.getElementById('itemText').value
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })

    if (res.ok) {
        getData()
    }
}

