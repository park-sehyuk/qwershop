document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.category-search-input');
    const searchButton = document.querySelector('.search');
    const tableBody = document.querySelector('.category-data-table tbody');
    const addProductButton = document.querySelector('.add-category');

    loadProductData();

    function loadProductData() {
        fetch('/admin/api/items')
            .then(res => res.json())
            .then(data => renderTable(data));
    }

    function renderTable(products) {
        tableBody.innerHTML = '';
        if (!products || products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">데이터가 없습니다.</td></tr>';
            return;
        }
        products.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.itemId}</td>
                <td class="product-name-cell">${p.itemName}</td>
                <td>${p.itemCategory || '반팔'}</td>
                <td>${new Date(p.regTime).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn" data-id="${p.itemId}">수정</button>
                    <button class="delete-btn" data-id="${p.itemId}">삭제</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    tableBody.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('edit-btn')) {
            const cell = e.target.closest('tr').querySelector('.product-name-cell');
            const oldVal = cell.textContent;
            const input = document.createElement('input');
            input.value = oldVal;
            cell.innerHTML = ''; cell.appendChild(input); input.focus();

            input.onkeypress = (ev) => {
                if (ev.key === 'Enter') {
                    fetch(`/admin/api/items/${id}/name`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({itemName: input.value})
                    }).then(() => loadProductData());
                }
            };
        }
        if (e.target.classList.contains('delete-btn')) {
            if (confirm("삭제하시겠습니까?")) {
                fetch(`/admin/api/items/${id}`, {method: 'DELETE'}).then(() => loadProductData());
            }
        }
    });

    addProductButton.onclick = () => location.href = '/admin/addpost';
});