import { editAlbum, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';


const editTemplate = (album, onSubmit) => html `
`

    // <!-- <form @submit=${onSubmit}id="edit-form"> -->
        

export async function editPage(ctx) {
    const meme = await getAlbumById(ctx.params.id)
    ctx.render(editTemplate(meme, onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imgUrl').trim();
        const price = formData.get('price').trim();
        const releaseDate = formData.get('releaseDate').trim();
        const artist = formData.get('artist').trim();
        const genre = formData.get('genre').trim();

        if (genre == '' || artist == '' || releaseDate == '' ||price == '' ||name == '' || description == '' || imageUrl == '') {
            return alert('All fields are required!');
        }
        await editAlbum(ctx.params.id, {
            name,
            description,
            imageUrl,
            price,
            releaseDate,
            artist,
            genre
        })

        ctx.page.redirect('/')

    }
}