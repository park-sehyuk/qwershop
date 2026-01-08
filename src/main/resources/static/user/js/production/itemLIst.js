document.addEventListener('DOMContentLoaded', () => {

    const ITEMS_PER_PAGE = 12;

    let currentPage = parseInt(localStorage.getItem('currentPage') || '1');
    let currentSort = localStorage.getItem('currentSort') || 'popular';
    let wishList = new Set(JSON.parse(localStorage.getItem('wishList') || '[]'));


    const grid = document.getElementById('product-grid');
    const totalItemsEl = document.getElementById('total-items');
    const paginationEl = document.getElementById('pagination');
    const sortContainer = document.querySelector('.sort-container');
    const sortButton = document.querySelector('.sort-button');
    const sortText = document.getElementById('sort-text');


    function render() {
        localStorage.setItem('currentPage', currentPage);
        localStorage.setItem('currentSort', currentSort);
        localStorage.setItem('wishList', JSON.stringify([...wishList]));

        let sortedProducts = [...productData];
        switch (currentSort) {
            case 'price_desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'price_asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsForPage = sortedProducts.slice(startIndex, endIndex);

        grid.innerHTML = itemsForPage.map(product => {
            const isWished = wishList.has(product.name);
            return `
                <div class="product-item">
                    <div class="imges-wrapper">
                        <a href="../production/detail.html?productName=${encodeURIComponent(product.name)}">
                            <imges src="${product.imageUrl}" alt="${product.name}">
                        </a>
                        <button class="wish-button ${isWished ? 'active' : ''}" data-product-name="${product.name}">
                            ♥
                        </button>
                    </div>
                    <div class="info">
                        <div class="brand">${product.content}</div>
                        <a href="../production/detail.html?productName=${encodeURIComponent(product.name)}">
                            <div class="name">${product.name}</div>
                        </a>
                        <div class="price">${parseFloat(product.price).toLocaleString()}원</div>
                    </div>
                </div>
            `;
        }).join('');

        renderPagination(sortedProducts.length);

        totalItemsEl.textContent = `${productData.length} Item`;
        const sortOptionText = document.querySelector(`.sort-dropdown a[data-sort="${currentSort}"]`).textContent;
        sortText.textContent = sortOptionText;
    }

    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        paginationEl.innerHTML = '';

        Array.from({ length: totalPages }, (_, i) => i + 1).forEach(page => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'page-link';
            button.textContent = page;
            if (page === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = page;
                render();
            });
            li.appendChild(button);
            paginationEl.appendChild(li);
        });
    }


    function setupEventListeners() {
        sortButton.addEventListener('click', (e) => {
            e.stopPropagation();
            sortContainer.classList.toggle('active');
        });

        document.querySelector('.sort-dropdown').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                currentSort = e.target.dataset.sort;
                currentPage = 1;
                render();
            }
        });

        window.addEventListener('click', () => {
            sortContainer.classList.remove('active');
        });

        grid.addEventListener('click', (e) => {
            const wishButton = e.target.closest('.wish-button');
            if (wishButton) {
                const productName = wishButton.dataset.productName;
                if (wishList.has(productName)) {
                    wishList.delete(productName);
                } else {
                    wishList.add(productName);
                }
                render();
            }
        });
    }

    setupEventListeners();
    render();
});