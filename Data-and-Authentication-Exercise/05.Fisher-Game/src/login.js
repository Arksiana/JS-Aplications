window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', onLogin)
})


async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')


    try {
        const res = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.ok != true) {
            const err = await res.json()
            throw new Error(err.message)
        }

        const data = await res.json()
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData))
        window.location = '/'

        

    } catch (err) {
        alert(err.message)
    }
}