document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('.category-data-table tbody');
    const searchInput = document.querySelector('.category-search-input');
    const searchButton = document.querySelector('.search');
    const resetButton = document.querySelector('.starline');

    let initialTableRows = Array.from(tableBody.querySelectorAll('tr'));

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const button = event.target;
            const categoryId = button.dataset.id;
            const row = button.closest('tr');
            const tabMenuNameCell = row.children[1];

            const currentTabMenuName = tabMenuNameCell.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentTabMenuName;
            inputField.className = 'edit-input';

            tabMenuNameCell.innerHTML = '';
            tabMenuNameCell.appendChild(inputField);

            inputField.focus();

            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const newTabMenuName = inputField.value;
                    if (newTabMenuName.trim() === '') {
                        alert('탭 메뉴 이름을 입력해주세요.');
                        inputField.focus();
                        return;
                    }
                    console.log(`카테고리 ID: ${categoryId}, 새 탭 메뉴명: ${newTabMenuName}`);
                    tabMenuNameCell.textContent = newTabMenuName;
                    updateInitialRows();
                    performSearch();
                }
            });

            inputField.addEventListener('blur', function() {
                if (tabMenuNameCell.querySelector('.edit-input')) {
                    tabMenuNameCell.textContent = currentTabMenuName;
                }
            });
        }

        if (event.target.classList.contains('delete-btn')) {
            const button = event.target;
            const categoryId = button.dataset.id;
            const rowToDelete = button.closest('tr');

            if (confirm(`${categoryId}번 탭 메뉴를 정말 삭제하시겠습니까?`)) {
                alert(`${categoryId}번 탭 메뉴 삭제 진행!`);
                rowToDelete.remove();
                updateInitialRows();
                performSearch();
            } else {
                alert('삭제를 취소했습니다.');
            }
        }
    });

    if (searchButton && searchInput && tableBody) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        if (resetButton) {
            resetButton.addEventListener('click', function() {
                searchInput.value = '';
                displayRows(initialTableRows);
            });
        }
    }

    function updateInitialRows() {
        initialTableRows = Array.from(tableBody.querySelectorAll('tr')).filter(row => {
            return !row.classList.contains('no-results-row') && !row.classList.contains('empty-dummy-row');
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredRows = [];

        initialTableRows.forEach(row => {
            const tabMenuName = row.children[1].textContent.toLowerCase();
            if (tabMenuName.includes(searchTerm)) {
                filteredRows.push(row);
            }
        });

        displayRows(filteredRows);
    }

    function displayRows(rowsToDisplay) {
        const minRows = 7;
        tableBody.innerHTML = '';

        if (rowsToDisplay.length > 0) {
            rowsToDisplay.forEach(row => {
                row.classList.remove('no-results-row', 'empty-dummy-row');
                tableBody.appendChild(row);
            });
        } else {
            const noResultsRow = document.createElement('tr');
            noResultsRow.classList.add('no-results-row');
            const noResultsCell = document.createElement('td');
            noResultsCell.colSpan = 8;
            noResultsCell.textContent = '검색 결과가 없습니다.';
            noResultsCell.style.textAlign = 'center';
            noResultsCell.style.padding = '20px';
            noResultsRow.appendChild(noResultsCell);
            tableBody.appendChild(noResultsRow);
        }

        const currentDisplayedRows = tableBody.querySelectorAll('tr').length;
        if (currentDisplayedRows < minRows) {
            const rowsToAdd = minRows - currentDisplayedRows;
            for (let i = 0; i < rowsToAdd; i++) {
                const emptyRow = document.createElement('tr');
                emptyRow.classList.add('empty-dummy-row');
                for (let j = 0; j < 8; j++) {
                    const emptyCell = document.createElement('td');
                    emptyCell.innerHTML = '&nbsp;';
                    emptyRow.appendChild(emptyCell);
                }
                tableBody.appendChild(emptyRow);
            }
        }
    }
});