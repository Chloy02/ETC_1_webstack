const apiKey = 'd690b0a4b7b7428993d2c01784326548';
const apiUrl = 'https://newsapi.org/v2/top-headlines'; 

fetch(`${apiUrl}?category=science&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById('news-container');
        let newsHtml = '';

        data.articles.forEach(article => {
            newsHtml += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                            <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                        </div>
                    </div>
                </div>
            `;
        });

        newsContainer.innerHTML = newsHtml;
    })
    .catch(error => console.error('Error fetching news:', error));
