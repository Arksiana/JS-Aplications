import { html } from '../lib.js'

const commentTemplate = (comment) => html`<li>${comment.content}</li>`

export default commentTemplate