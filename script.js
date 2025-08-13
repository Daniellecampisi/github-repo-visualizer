

document.getElementById("fetchBtn").addEventListener("click", async () => 
{
    const username = document.getElementById("username").value.trim();

    // if username empty return alert
    if (!username) return alert("Please enter a username");

    //fetch the username's page
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await response.json();

    if (repos.message) {
    alert("User not found or API limit reached.");
    return;
    }

    console.log(repos); // Debug

    const languageCount = {};

    repos.forEach(repo => {
    if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
    });

    console.log(languageCount);

});
