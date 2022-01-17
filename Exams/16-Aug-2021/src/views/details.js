import { deleteById, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete, onEdit) => html `
`

export async function detailsPage(ctx) {
    const album = await getAlbumById(ctx.params.id)
    const userData = getUserData();
    const isOwner = userData && album._ownerId == userData.id;
    ctx.render(detailsTemplate(album, isOwner, onDelete,onEdit))
    async function onDelete() {       
            await deleteById(ctx.params.id)
            ctx.page.redirect('/')
    
    }
    async function onEdit(ev){
        ev.preventDefault()
        ctx.page.redirect('/edit/' + ctx.params.id)
    }
}

