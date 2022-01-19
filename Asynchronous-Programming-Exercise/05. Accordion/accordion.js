function e(tag, className='', content='') {
    const element = document.createElement(tag)
    element.className = className
    element.textContent = content

    return element
}


async function solution() {
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`
    const main = document.getElementById('main');
    const res = await fetch(url)
    const data = await res.json()

    data.forEach(x => main.appendChild(template(x)));
}


function template({_id, title}){
    const accordionDiv = e('div', 'accordion')
    const headDiv = e('div', 'head')
    const titleSpan = e('span', '', title)
    const btn = e('button', 'button', 'More')
    const extraDiv = e('div', 'extra')
    const contentParagraph = e('p')
    
    extraDiv.style.display = 'none'
    btn.id = _id

    headDiv.append(titleSpan, btn)
    extraDiv.appendChild(contentParagraph)
    accordionDiv.append(headDiv, extraDiv)

    btn.addEventListener('click', async () => {
        if(extraDiv.style.display === 'none'){
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
            const res = await fetch(url)
            const data = await res.json()
            btn.textContent = 'Less'
            extraDiv.style.display = 'block'
            contentParagraph.textContent = data.content
        } else {
            btn.textContent = 'More'
            extraDiv.style.display = 'none'
        }
    })

    return accordionDiv
}



solution()