

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
    // Reset and show sections
    document.querySelector(".table-section").style.display = "block";
    document.getElementById("stats").style.display = "block";


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
    document.querySelector(".right-section").style.display = "block";
    document.getElementById("stars").textContent = `Total Stars: ${totalStars}`;
    document.getElementById("forks").textContent = `Total Forks: ${totalForks}`;

    // populate table
    const tbody = document.querySelector("#repoTable tbody");
    tbody.innerHTML = ""; // clear old data
    repos.forEach(repo => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
        <td>${repo.language || 'N/A'}</td>
        <td>${repo.stargazers_count}</td>
        <td>${repo.forks_count}</td>
        `;
        tbody.appendChild(row);
    });

    // Update chart (reset old one if exists)
    if (window.langChartInstance) {
        window.langChartInstance.destroy();
    }

    // Dynamic colors
  const languages = Object.keys(languageCount);
  const colors = languages.map((_, i) => `hsl(${i * (360 / languages.length)}, 70%, 60%)`);

  // Create chart
  const ctx = document.getElementById('langChart').getContext('2d');
  window.langChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: languages,
      datasets: [{
        label: 'Languages Used',
        data: Object.values(languageCount),
        backgroundColor: colors
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
});

