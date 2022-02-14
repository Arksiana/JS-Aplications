

import { showView } from "./dom.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";
// import { showDetails } from "./details.js"
import { showLogin } from "./login.js"
import { showRegister } from "./register.js"

// create placeholder module for every view
// configure and test navigation 
// implement modules 
// - create async functions for request
// - implement DOM logic
const nav = document.querySelector('nav')
const views = {
    "homeLink": showHome,
    "loginLink": showLogin,
    "registerLink": showRegister
}


nav.addEventListener('click', (event) => {
    const view = views[event.target.id]
    if (typeof view == 'function') {
        event.preventDefault();
        view()
    }
})
document.getElementById('logoutBtn').addEventListener('click', onLogOut)

updateNav()
// start application home view / catalog
showHome()


export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none')
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block')

    }
}


async function onLogOut(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    const {token} = JSON.stringify(sessionStorage.getItem('userData'))
    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization':token
        }
    })

    sessionStorage.removeItem('userData')
    updateNav()
    showLogin()
}

// order of views
// x catalog (home view)
// x login
// - register
// x logout
// - create
// - details
// - likes
// - edit /load data, populate form, validation, request
// - delete
