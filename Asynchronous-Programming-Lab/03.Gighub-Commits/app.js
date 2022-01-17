function loadCommits() {
    const username = document.getElementById("username").value
    const repo = document.getElementById("repo").value
    const list = document.getElementById("commits");


    const url = `https://api.github.com/repos/${username}/${repo}/commits`
    
        fetch(url)
        .then((res) => {
            if (res.ok == false) {
                throw new Error(`${res.status} ${res.statusText}`);
              }
        
              return res.json();
            })
        .then(handleResponse)
        .catch(handleError)

        function handleResponse(data) {
            list.innerHTML = ''

            for(let com of data){
                const liElement = document.createElement('li')
                liElement.innerHTML = `${com.commit.author.name}: ${com.commit.message}`;
                list.appendChild(liElement)
            
            }
        }


        function handleError(err) {
            list.innerHTML = ''
            list.textContent = `${err.message}`
          }
        
        }
