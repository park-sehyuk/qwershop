document.addEventListener('DOMContentLoaded', () => {

    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let currentSort = new URLSearchParams(window.location.search).get('sort') || 'latest';
    let wishList = new Set(JSON.parse(localStorage.getItem('wishList') || '[]'));

    const grid = document.getElementById('product-grid');
    const totalItemsEl = document.getElementById('total-items');
    const paginationEl = document.getElementById('pagination');
    const sortContainer = document.querySelector('.sort-container');
    const sortButton = document.querySelector('.sort-button');
    const sortText = document.getElementById('sort-text');

    function render() {
        if (!productData || productData.length === 0) {
            grid.innerHTML = '<p>상품이 없습니다.</p>';
            return;
        }

        let sortedProducts = [...productData];
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const itemsForPage = sortedProducts.slice(startIndex, endIndex);

        grid.innerHTML = itemsForPage.map(product => {
            const isWished = wishList.has(product.itemName);
            const price = product.itemPrice ? parseFloat(product.itemPrice).toLocaleString() : '0';

            // 이미지 주소가 http로 시작하는지 철저히 검사
            let imgSrc = product.itemUrl;

            if (imgSrc && imgSrc.includes('http')) {
                // 외부 주소인 경우 그대로 사용 (공백 제거 포함)
                imgSrc = imgSrc.trim();
            } else if (imgSrc) {
                // 로컬 주소인 경우 / 붙여주기
                imgSrc = imgSrc.startsWith('/') ? imgSrc : '/' + imgSrc;
            } else {
                // 주소가 아예 없을 때
                imgSrc = '/user/imges/no-image.png';
            }

            return `
                <div class="product-item">
                    <div class="imges-wrapper">
                        <a href="/detail?itemId=${product.itemId}">
                            <img src="${imgSrc}" alt="${product.itemName}">
                        </a>
                        <button class="wish-button ${isWished ? 'active' : ''}" data-product-name="${product.itemName}">
                            ♥
                        </button>
                    </div>
                    <div class="info">
                        <div class="brand">${product.itemBrand || ''}</div>
                        <a href="/detail?itemId=${product.itemId}">
                            <div class="name">${product.itemName}</div>
                        </a>
                        <div class="price">${price}원</div>
                    </div>
                </div>
            `;
        }).join('');

        renderPagination(sortedProducts.length);
        if(totalItemsEl) totalItemsEl.textContent = `${productData.length} Item`;
    }

    function renderPagination(totalItems) {
        if(!paginationEl) return;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        paginationEl.innerHTML = '';
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = i === currentPage ? 'page-link active' : 'page-link';
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                render();
                window.scrollTo(0, 0);
            });
            li.appendChild(button);
            paginationEl.appendChild(li);
        }
    }

    function setupEventListeners() {
        if(sortButton) {
            sortButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if(sortContainer) sortContainer.classList.toggle('active');
            });
        }
        window.addEventListener('click', () => {
            if(sortContainer) sortContainer.classList.remove('active');
        });
    }

    setupEventListeners();
    render();
});