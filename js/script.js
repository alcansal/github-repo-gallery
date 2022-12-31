// This selects the div class of overview and your profile information will appear
const profileInfo = document.querySelector(".overview");

// This will be the Git hub username
const username = "alcansal";

// This will select the unordered list element with the class of repo-list
const repoList = document.querySelector(".repo-list");

// async function to fetch information for github profile 
const githubProfile = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
   console.log(data);
  displayUserInfo(data);
};
githubProfile();

// This function will display the json data to the page 
const displayUserInfo = function (data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
  newDiv.innerHTML = 
`<figure>
  <img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Bio:</strong> ${data.bio}</p>
  <p><strong>Location:</strong> ${data.location}</p>
  <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div>`;

profileInfo.append(newDiv);
getRepos();
};

// This async function will fetch repos
const getRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await fetchRepos.json();
  // console.log(data);
  displayRepos(data);
};

const displayRepos = function (repos) {
  for (const repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};