
// const registerForm = document.getElementById("form");
// registerForm.addEventListener("submit", onRegister);
// const urlRegister = `http://localhost:3030/users/register`;

// async function onRegister(event) {
//     event.preventDefault();
//     const formData = new FormData(registerForm);

//     const email = formData.get("email").trim();
//     const password = formData.get("password").trim();
//     const repass = formData.get("repass").trim();

//     const res = await fetch(urlRegister, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//     });

//     const result = await res.json();

//     const token = result.accessToken;
//     sessionStorage.setItem("token", token);
//     window.location = "/index.html";
// }


window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);
});


async function onRegister(event) {
    const url = `http://localhost:3030/users/register`
    event.preventDefault();

    const form = event.target
    const formData = new FormData(form)

    const email = formData.get('email').trim()
    const password = formData.get('password').trim()

    try { 
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if(res.ok != true) {
            const error = await res.json()
            throw new Error(`Error: ${error.message}`)
        }

        const data = await res.json()
        const token = data.accessToken

        localStorage.setItem('token', token)

        window.location = '/index.html'


    } catch (err) {
        alert(`Error: ${err.message}`)
    }

}