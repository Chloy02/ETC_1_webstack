document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const searchInput = document.getElementById('searchInput');
    const paginationControls = document.getElementById('paginationControls');

    let newsData = [];
    let currentPage = 1;
    const itemsPerPage = 2;

    // Fetch news from JSON file
    async function fetchNews() {
        try {
            const response = await fetch('news.json'); // Fetch JSON file
            newsData = await response.json(); // Parse JSON
            displayNews(); // Display news on load
            setupPagination();
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    // Display news items as cards
    function displayNews() {
        const filteredData = filterNews();
        const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

        newsContainer.innerHTML = paginatedData.map(article => `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="News Image">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <p class="card-text"><small class="text-muted">Published on ${new Date(article.publishedAt).toLocaleDateString()} by ${article.author || 'Unknown'}</small></p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Pagination logic
    function paginate(array, pageNumber, itemsPerPage) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        return array.slice(startIndex, startIndex + itemsPerPage);
    }

    // Setup pagination buttons
    function setupPagination() {
        const filteredData = filterNews();
        const pageCount = Math.ceil(filteredData.length / itemsPerPage);

        paginationControls.innerHTML = Array.from({ length: pageCount }, (_, i) => `
            <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
                <a class="page-link" href="#">${i + 1}</a>
            </li>
        `).join('');

        // Add click event to pagination buttons
        paginationControls.querySelectorAll('.page-link').forEach((link, index) => {
            link.addEventListener('click', () => {
                currentPage = index + 1;
                displayNews();
                setupPagination();
            });
        });
    }

    // Filter news by search input
    function filterNews() {
        const searchValue = searchInput.value.toLowerCase();
        return newsData.filter(article => 
            article.title.toLowerCase().includes(searchValue)
        );
    }

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page on new search
        displayNews();
        setupPagination();
    });

    // Initialize the page
    fetchNews();
});
