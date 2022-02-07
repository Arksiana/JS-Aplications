import { showHomePage, showAboutPage } from './home.js'
import { showCatalogPage } from './catalog.js'
import { showLoginPage} from './login.js'

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    'homeBtn': showHomePage,
    'catalogBtn': showCatalogPage,
    'aboutBtn': showAboutPage,
    'loginBtn': showLoginPage,
    // ''
}

// start application in home view
showHomePage()

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const view = sections[event.target.id]
        if (typeof view == 'function') {
            event.preventDefault();
            view()
        }
    }
}
