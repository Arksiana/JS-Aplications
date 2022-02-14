// initialization
// - find relevant sections
// - detach section from DOM

import { showView } from './dom.js'

const section = document.getElementById('form-sign-up')
section.remove()


// display logic

export function showRegister(){
    showView(section)
}

