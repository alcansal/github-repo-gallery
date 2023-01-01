// This selects the div class of overview and your profile information will appear
const profileInfo = document.querySelector(".overview");

// This will be the Git hub username
const username = "alcansal";

// This will select the unordered list element with the class of repo-list
const repoList = document.querySelector(".repo-list");

// This will select the section element with the class of repos 
const repos = document.querySelector(".repos");

// This will select the section element with the class of repo-data
const repoData = document.querySelector(".repo-data");

// This will select a button with text back to repo Gallery
const button = document.querySelector(".view-repos");

// This will select a input element with a placeholder of search by name 
const filterInput = document.querySelector(".filter-repos");


// async function to fetch information for github profile 
const githubProfile = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
   console.log(data);
  displayUserInfo(data);
};
githubProfile();

// This function will display the github profile to the page 
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

// This async function will fetch info for repos
const getRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await fetchRepos.json();
  // console.log(data);
  displayRepos(data);
};

// This function will display repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    filterInput.classList.remove("hide");
  }
};

// A click event to match repos 
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});


// Function to get specific repo info
const getRepoInfo = async function (repoName) {
  const repoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await repoFetch.json();
   console.log(repoInfo);

  // Fetching languages on repos
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // console.log(languageData);
  const languages = [];

  for (const language in languageData) {
    languages.push(language);
  }
  // console.log(languages);
  displayRepoInfo(repoInfo, languages);
};

// This function will display info from specific repo
const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  button.classList.remove("hide");

  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  repoData.append(div);
  repoData.classList.remove("hide");
  repos.classList.add("hide");
};

// This click event will point back to the repo gallery
button.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  button.classList.add("hide");
});


// This event will point towards the input 
filterInput.addEventListener("input", function (e) {
  const search = e.target.value;
  // console.log(search);

  const repos = document.querySelectorAll(".repo");
  const lowerText = search.toLowerCase();

  for (const repo of repos) {
    let lowerTextRepo = repo.innerText.toLowerCase();
    
    // this filters out the repos 
    if (lowerTextRepo.includes(lowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});