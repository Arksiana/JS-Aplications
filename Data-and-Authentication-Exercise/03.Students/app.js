document.getElementById('form').addEventListener('submit', onSubmit)
const tbody = document.querySelector('tbody')
loadStudents()


async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const facultyNumber = formData.get('facultyNumber')
    const grade = formData.get('grade')

    const result = await createStudent({ firstName, lastName, facultyNumber, grade })
    tbody.appendChild(createRow(result))
    event.target.reset()
}

function createRow(student) {
    const row = document.createElement('tr')
    row.innerHTML = `<th>${student.firstName}</th>
    <th>${student.lastName}</th>
    <th>${student.facultyNumber}</th>
    <th>${student.grade}</th>`

    return row
}


async function loadStudents() {
    const books = await request(`http://localhost:3030/jsonstore/collections/students`)
    const result = Object.values(books).map((student) => createRow(student))

    tbody.replaceChildren(...result)
}



async function createStudent(student) {
    const result = await request(`http://localhost:3030/jsonstore/collections/students`, {
        method: 'POST',
        body: JSON.stringify(student)
    })

    return result
}


async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const res = await fetch(url, options);

    if (res.ok != true) {
        const error = await res.json()
        alert(error.message)
        throw new Error(error.message)
    }

    const data = await res.json()
    return data
}
