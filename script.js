const apiKey = "e922db8a731a4014a7e2127907842954";
const endpoint = `https://newsapi.org/v2/top-headlines?category=technology&pageSize=5&language=en&apiKey=${apiKey}`;

async function loadNews() {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    const container = document.getElementById("news-container");
    container.innerHTML = "";

    if (data.articles.length === 0) {
      container.innerHTML = "<p>No news articles found.</p>";
      return;
    }

    data.articles.forEach(article => {
      const div = document.createElement("div");
      div.className = "news-card";
      div.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || "No summary available."}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    document.getElementById("news-container").innerHTML = `<p>Error loading news: ${error.message}</p>`;
  }
}

if (document.getElementById("news-container")) {
  loadNews();
}
