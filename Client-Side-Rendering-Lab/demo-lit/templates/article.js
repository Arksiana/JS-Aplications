import { html } from '../lib.js';
import  commentTemplate  from './comment.js'

const articleTemplate = (onSubmit, data) => html`<article>
    <input type="text" ?disabled=${data.disabled} .value=${data.color}>
    <h3>${data.title}</h3>
    <div class=${data.color}>
        <p>${data.content}</p>
    </div>
    <footer>${data.author}${data.isOwner ? html`<button>Edit</button>` : null}</footer>
    <div class="coments">
        <form @submit=${onSubmit}>
            
            <textarea name="comment"}></textarea>
            <button>Submit Comment</button>
        </form>

        <ul>
            ${data.comments.map(commentTemplate)}
        </ul>

    </div>
</article>
`
export default articleTemplate