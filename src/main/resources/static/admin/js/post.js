document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('product-list-body');

    // 화면 표시용 역매핑 테이블
    const categoryMap = { 13: "BEST", 14: "추천상품", 15: "이달의 상품" };
    const typeMap = {
        76: "Men-상의", 77: "Men-하의", 78: "Men-신발", 79: "Men-그 외",
        81: "Women-상의", 82: "Women-하의", 83: "Women-신발", 84: "Women-그 외"
    };

    // 1. 목록 로드
    window.loadProductData = function() {
        fetch('/admin/api/items')
            .then(res => res.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(p => renderRow(p));
            });
    };

    // 2. 일반 행 출력
    function renderRow(p) {
        const imgUrl = p.itemUrl ? p.itemUrl : '/admin/img/no-image.png';
        const catName = categoryMap[p.dbCategory] || "일반";
        const typeName = typeMap[p.dbType] || "미지정";

        const row = document.createElement('tr');
        row.id = `row-${p.itemId}`;
        row.innerHTML = `
            <td><img src="${imgUrl}" style="width:60px; height:60px; object-fit:cover;"></td>
            <td><strong>${p.itemName}</strong><br><small>${p.itemBrand}</small></td>
            <td>${p.itemPrice.toLocaleString()}원</td>
            <td>${catName} / ${typeName}</td>
            <td>${p.itemStock}개</td>
            <td>${p.regTime ? p.regTime.split('T')[0] : '-'}</td>
            <td>
                <button class="edit-btn" onclick='toggleEditMode(${p.itemId}, ${JSON.stringify(p).replace(/'/g, "\\'")})'>수정</button>
                <button class="delete-btn" onclick="deleteItem(${p.itemId})">삭제</button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    // 3. 수정 모드 전환
    window.toggleEditMode = function(id, p) {
        const row = document.getElementById(`row-${id}`);
        row.innerHTML = `
            <td><img src="${p.itemUrl || '/admin/img/no-image.png'}" style="width:60px; height:60px; opacity:0.5;"></td>
            <td>
                <input type="text" id="edit-name-${id}" value="${p.itemName}" style="width:90%;"><br>
                <input type="text" id="edit-brand-${id}" value="${p.itemBrand}" style="width:90%; margin-top:5px;">
            </td>
            <td><input type="number" id="edit-price-${id}" value="${p.itemPrice}" style="width:100px;"></td>
            <td>
                <select id="edit-category-${id}" style="margin-bottom:5px; width:100%;">
                    ${Object.entries(categoryMap).map(([val, name]) => `<option value="${val}" ${p.dbCategory == val ? 'selected' : ''}>${name}</option>`).join('')}
                </select>
                <select id="edit-type-${id}" style="width:100%;">
                    ${Object.entries(typeMap).map(([val, name]) => `<option value="${val}" ${p.dbType == val ? 'selected' : ''}>${name}</option>`).join('')}
                </select>
            </td>
            <td><input type="number" id="edit-stock-${id}" value="${p.itemStock}" style="width:60px;"></td>
            <td>-</td>
            <td>
                <button class="save-btn" onclick="saveEdit(${id})" style="background-color:#28a745; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">저장</button>
                <button class="cancel-btn" onclick="loadProductData()" style="background-color:#6c757d; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; margin-left:5px;">취소</button>
            </td>
        `;
    };

    // 4. 즉석 수정 저장 (PATCH 메서드 사용)
    window.saveEdit = async function(id) {
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        const updateData = {
            itemName: document.getElementById(`edit-name-${id}`).value,
            itemBrand: document.getElementById(`edit-brand-${id}`).value,
            itemPrice: parseInt(document.getElementById(`edit-price-${id}`).value),
            dbCategory: parseInt(document.getElementById(`edit-category-${id}`).value),
            dbType: parseInt(document.getElementById(`edit-type-${id}`).value),
            itemStock: parseInt(document.getElementById(`edit-stock-${id}`).value)
        };

        const res = await fetch(`/admin/api/items/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', [header]: token },
            body: JSON.stringify(updateData)
        });

        if (res.ok) {
            alert("수정되었습니다.");
            loadProductData();
        } else {
            alert("수정 실패");
        }
    };

    // 5. 삭제
    window.deleteItem = function(id) {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        fetch(`/admin/api/items/${id}`, {
            method: 'DELETE',
            headers: { [header]: token }
        }).then(res => { if (res.ok) loadProductData(); });
    };

    loadProductData();
});