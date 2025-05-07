document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news");
  const apiKey = "8555908805786fd1bf9aa885ce64c943";
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles available.</p>";
        return;
      }

      newsContainer.innerHTML = "";
      data.articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";

        const title = document.createElement("a");
        title.href = article.url;
        title.target = "_blank";
        title.textContent = article.title;
        title.className = "news-title";

        const source = document.createElement("p");
        source.textContent = `Source: ${article.source.name}`;
        source.className = "news-source";

        newsItem.appendChild(title);
        newsItem.appendChild(source);
        newsContainer.appendChild(newsItem);
      });
    })
    .catch(error => {
      newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
    });
});
