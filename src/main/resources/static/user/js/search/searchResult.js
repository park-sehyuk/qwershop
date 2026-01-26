const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let currentSort = "popular";

function render() {
  const grid = document.getElementById("product-grid");
  const totalItemsEl = document.getElementById("total-items");
  const products = window.dbProducts || [];

  if (!grid) return;

  let items = [...products];
  if (currentSort === "price_desc") items.sort((a, b) => b.itemPrice - a.itemPrice);
  else if (currentSort === "price_asc") items.sort((a, b) => a.itemPrice - b.itemPrice);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const itemsForPage = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  grid.innerHTML = itemsForPage.map(product => `
    <div class="product-item">
      <div class="img-wrapper">
        <a href="/detail?id=${product.itemId}">
          <img src="${product.itemUrl || ''}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23eee%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23aaa%22>No Image</text></svg>';">
        </a>
      </div>
      <div class="info">
        <div class="brand">${product.itemBrand}</div>
        <div class="name"><a href="/detail?id=${product.itemId}">${product.itemName}</a></div>
        <div class="price">${Number(product.itemPrice).toLocaleString()}원</div>
      </div>
    </div>
  `).join("");

  if (totalItemsEl) totalItemsEl.textContent = `${items.length} Item`;
  renderPagination(items.length);
}

function renderPagination(totalItems) {
  const paginationEl = document.getElementById("pagination");
  if (!paginationEl) return;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  paginationEl.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = `page-link ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; window.scrollTo(0,0); render(); };
    li.appendChild(btn);
    paginationEl.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sortBtn = document.querySelector(".sort-button");
  const sortContainer = document.querySelector(".sort-container");

  if (sortBtn) {
    sortBtn.onclick = (e) => {
      e.stopPropagation();
      sortContainer.classList.toggle("active");
    };
  }

  document.querySelectorAll(".sort-dropdown a").forEach(a => {
    a.onclick = (e) => {
      e.preventDefault();
      currentSort = e.target.dataset.sort;
      currentPage = 1;
      sortContainer.classList.remove("active");
      render();
    };
  });

  render();
});
