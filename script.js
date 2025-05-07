const apiKey = "e922db8a731a4014a7e2127907842954";
const newsContainer = document.getElementById("newsContainer");

fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=5&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No articles found.</p>";
      return;
    }

    newsContainer.innerHTML = "";
    data.articles.forEach(article => {
      const articleEl = document.createElement("div");
      articleEl.classList.add("article");
      articleEl.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || "No description available."}</p>
      `;
      newsContainer.appendChild(articleEl);
    });
  })
  .catch(error => {
    console.error("News fetch error:", error);
    newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
  });
