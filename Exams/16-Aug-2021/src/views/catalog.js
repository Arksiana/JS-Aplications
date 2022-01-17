
import { getAllGames } from '../api/data.js';
import { html } from '../lib.js';


const catalogTemplate = (albums) => html`

`

const albumCard = (album) => html`

`

export async function catalogPage(ctx) {
    const albums = await getAllGames()
    ctx.render(catalogTemplate(albums));
}