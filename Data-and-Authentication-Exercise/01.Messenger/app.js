function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages)
    document.getElementById('submit').addEventListener('click', onSubmit)
}

const authorInput = document.querySelector('[name="author"]')
const contentInput = document.querySelector('[name="content"]')
    

attachEvents();

async function onSubmit() {
    const author = authorInput.value
    const content = contentInput.value

   const result = await createMessage({author, content})
   contentInput.value = ''
   list.value += '\n' + ` ${author}: ${content}`


}


async function loadMessages(){
    const url = `http://localhost:3030/jsonstore/messenger`
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data)
    const list = document.getElementById("messages")
    list.value = messages.map(m => `${m.author}: ${m.content}`).join("\n")

}

async function createMessage(message){
    const url = `http://localhost:3030/jsonstore/messenger`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }

    const res = await fetch(url, options)
    const result = await res.json()

    return result
}