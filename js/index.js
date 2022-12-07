const link = 'https://api.github.com/';
const userList = document.getElementById('user-list');
const form = document.getElementById('github-form')

form.addEventListener('submit', event => {
    event.preventDefault()
    let input = event.target.search.value;
    //eliminate white space
    let user = input.split(' ').join('')

    searchForUser(user)
})
//fetch user
function searchForUser(user) {
    fetch(`${link}users/${user}`)
        .then(resp => resp.json())
        .then(data => displayUserInfo(data, user))
}
//fetch repos and iterate through
function fetchRepos(repo) {
    const div2 = document.querySelector("#repos-list")
    repositoryNames = []
    for (const info of repo) {
        const p = document.createElement("p")
        p.innerText = (info.name)
        div2.append(p)
    }
    div2.style.border = "3px solid #FF0000"
}
//display found user on html
function displayUserInfo(data, user) {
    const div = document.querySelector("#user-list")

    const h2 = document.createElement("h2")
    h2.textContent = data.login
    //link on image
    const a = document.createElement("a");
    a.target = "_blank"
    a.href = `https://github.com/${data.login}`
    a.innerHTML = `<img src="${data.avatar_url}"/>`
    //get repos button
    const btn = document.createElement("button")
    btn.setAttribute("id", `${data.login}`)
    btn.textContent = "View Repositories >"

    btn.addEventListener("click", () => {
        fetch(`https://api.github.com/users/${data.login}/repos`)
            .then(resp => resp.json())
            .then(data => fetchRepos(data))
    })
    const card = document.createElement("div");
    card.append(h2, a, btn);
    div.appendChild(card);
}
