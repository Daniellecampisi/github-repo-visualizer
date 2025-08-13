

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

    const languageCount = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
    if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
    });

    document.getElementById("stars").textContent = `Total Stars: ${totalStars}`;
    document.getElementById("forks").textContent = `Total Forks: ${totalForks}`;


    const ctx = document.getElementById('langChart').getContext('2d');
    
    new Chart(ctx, {
    type: 'pie',
    data: {
        labels: Object.keys(languageCount),
        datasets: [{
        label: 'Languages Used',
        data: Object.values(languageCount),
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
        ]
        }]
    }
    });

    

});
