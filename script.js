document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");

  if (!newsContainer) return;

  const apiKey = 'YOUR_API_KEY_HERE'; // Replace this with your real NewsAPI key
  const url = `https://newsapi.org/v2/top-headlines?category=business&q=marketing&language=en&pageSize=5&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No articles found.</p>";
        return;
      }

      let output = "<ul>";
      data.articles.forEach(article => {
        output += `
          <li style="margin-bottom: 1rem;">
            <a href="${article.url}" target="_blank" style="color: green; font-weight: bold;">${article.title}</a><br>
            <span style="color: #444;">${article.description || ''}</span>
          </li>
        `;
      });
      output += "</ul>";
      newsContainer.innerHTML = output;
    })
    .catch(error => {
      newsContainer.innerHTML = "<p>There was an error loading news.</p>";
      console.error("Error fetching news:", error);
    });
});
