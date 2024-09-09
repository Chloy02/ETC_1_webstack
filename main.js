document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput');
    const newsContainer = document.getElementById('newsContainer');
    const pagination = document.getElementById('pagination');

    let newsData = []; // Store news data fetched from API
    const itemsPerPage = 6;
    let currentPage = 1;

    // Fetch and display news data
    async function fetchNews() {
        const response = await fetch('https://newsapi.org/v2/everything?q=technology&apiKey=d690b0a4b7b7428993d2c01784326548');
        const data = await response.json();
        newsData = data.articles; // Adjust based on the actual API response structure
        displayNews();
        setupPagination();
    }

    function displayNews() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const filteredNews = filterNews(newsData);
        const paginatedNews = filteredNews.slice(start, end);

        newsContainer.innerHTML = paginatedNews.map(article => `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="News Image">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description ? article.description.substring(0, 100) + '...' : ''}</p>
                        <p class="card-text"><small class="text-muted">${new Date(article.publishedAt).toLocaleDateString()} by ${article.source.name}</small></p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter news based on input
    function filterNews(news) {
        const query = filterInput.value.toLowerCase();
        return news.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query)
        );
    }

    // pagination controls
    function setupPagination() {
        const filteredNews = filterNews(newsData);
        const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
            <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i + 1}">${i + 1}</a>
            </li>
        `).join('');
    }

    // Handle page click
    pagination.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            currentPage = parseInt(e.target.getAttribute('data-page'), 10);
            displayNews();
            setupPagination();
        }
    });

    // Handle filter input
    filterInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page on filter change
        displayNews();
        setupPagination();
    });

    fetchNews();
});
