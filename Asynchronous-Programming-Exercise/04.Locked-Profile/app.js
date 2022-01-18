async function lockedProfile() {
    const main = document.querySelector('main')
    const url = `http://localhost:3030/jsonstore/advanced/profiles`
    const res = await fetch(url)
    const data = await res.json()
    Object.values(data).forEach(profile => {
        // main.replaceChildren()
        const element = document.createElement('div')
        element.className = 'profile'
        element.innerHTML =`<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user1Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user1Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user1Username" value="" disabled readonly />
<div class="hiddenInfo">
    <hr>
    <label>Email:</label>
    <input type="email" name="user1Email" value="" disabled readonly />
    <label>Age:</label>
    <input type="email" name="user1Age" value="" disabled readonly />
</div>

<button>Show more</button>`


        main.appendChild(element)
    })
}
