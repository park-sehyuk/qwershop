document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('product-list-body');
    let selectedFiles = [];

    const categoryMap = { 13: "BEST", 14: "추천상품", 15: "이달의 상품" };
    const typeMap = {
        16: "New", 17: "Best", 75: "Men (종합)", 76: "Men-상의", 18: "남성상의-반팔", 19: "남성상의-긴팔",
        20: "남성상의-셔츠", 21: "남성상의-니트/스웨터", 22: "남성상의-후드", 23: "남성상의-맨투맨",
        24: "남성상의-민소매", 25: "남성상의-기능성", 26: "Men-하의", 27: "남성하의-데님",
        28: "남성하의-슬랙스", 29: "남성하의-면바지", 30: "남성하의-반바지", 31: "남성하의-트레이닝",
        32: "남성하의-조거", 33: "Men-아우터", 34: "남성아우터-코트", 35: "남성아우터-자켓",
        36: "남성아우터-점퍼", 37: "남성아우터-가디건", 38: "남성아우터-패딩", 39: "남성아우터-베스트",
        40: "Women (종합)", 41: "Women-상의", 42: "여성상의-반팔", 43: "여성상의-긴팔",
        44: "여성상의-셔츠/블라우스", 45: "여성상의-니트/스웨터", 46: "여성상의-후드", 47: "여성상의-맨투맨",
        48: "여성상의-민소매", 49: "여성상의-기능성", 50: "Women-하의", 51: "여성하의-데님",
        52: "여성하의-슬랙스", 53: "여성하의-면바지", 54: "여성하의-반바지", 55: "여성하의-트레이닝",
        56: "여성하의-조거", 57: "여성하의-치마/스커트", 58: "Women-아우터", 59: "여성아우터-코트",
        60: "여성아우터-자켓", 61: "여성아우터-점퍼", 62: "여성아우터-가디건", 63: "여성아우터-패딩",
        64: "여성아우터-베스트", 65: "Women-원피스", 66: "여성원피스-미니", 67: "여성원피스-미디",
        68: "여성원피스-롱", 69: "Unisex (종합)", 70: "Acc (종합)", 71: "악세서리-모자",
        72: "악세서리-가방", 73: "악세서리-양말", 74: "악세서리-기타"
    };

    window.loadProductData = function() {
        fetch('/admin/api/items').then(res => res.json()).then(data => {
            tableBody.innerHTML = '';
            data.forEach(p => renderRow(p));
        });
    };

    function renderRow(p) {
        const row = document.createElement('tr');
        row.id = `row-${p.itemId}`;
        row.innerHTML = `
            <td><img src="${p.itemUrl || '/admin/img/no-image.png'}" style="width:60px; height:60px; object-fit:cover;"></td>
            <td style="text-align:left;"><strong>${p.itemName}</strong><br><small>${p.itemBrand}</small></td>
            <td>${p.itemPrice.toLocaleString()}원</td>
            <td>${categoryMap[p.dbCategory] || "일반"} / ${typeMap[p.dbType] || "미지정"}</td>
            <td>${p.itemStock}개</td>
            <td>${p.regTime ? p.regTime.split('T')[0] : '-'}</td>
            <td>
                <button onclick='toggleEditMode(${p.itemId}, ${JSON.stringify(p).replace(/'/g, "\\'")})'>수정</button>
            </td>`;
        tableBody.appendChild(row);
    }

    window.toggleEditMode = function(id, p) {
        selectedFiles = [];
        const row = document.getElementById(`row-${id}`);
        row.innerHTML = `
            <td>
                <div id="edit-img-preview-${id}"><img src="${p.itemUrl || '/admin/img/no-image.png'}" style="width:60px; height:60px;"></div>
                <input type="file" id="edit-file-${id}" multiple style="display:none;" onchange="handleEditImageSelect(event, ${id})">
                <button type="button" onclick="document.getElementById('edit-file-${id}').click()">변경</button>
            </td>
            <td>
                <input type="text" id="edit-name-${id}" value="${p.itemName}"><br>
                <input type="text" id="edit-brand-${id}" value="${p.itemBrand}">
            </td>
            <td><input type="number" id="edit-price-${id}" value="${p.itemPrice}"></td>
            <td>
                <select id="edit-category-${id}">
                    ${Object.entries(categoryMap).map(([v, n]) => `<option value="${v}" ${p.dbCategory == v ? 'selected' : ''}>${n}</option>`).join('')}
                </select>
                <select id="edit-type-${id}">
                    ${Object.entries(typeMap).map(([v, n]) => `<option value="${v}" ${p.dbType == v ? 'selected' : ''}>${n}</option>`).join('')}
                </select>
            </td>
            <td><input type="number" id="edit-stock-${id}" value="${p.itemStock}"></td>
            <td>-</td>
            <td>
                <button onclick="saveEdit(${id})">저장</button>
                <button onclick="loadProductData()">취소</button>
            </td>`;
    };

    window.handleEditImageSelect = function(e, id) {
        selectedFiles = Array.from(e.target.files);
        // 미리보기 로직 (생략 가능)
    };

    window.saveEdit = async function(id) {
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;
        const formData = new FormData();

        const itemData = {
            itemId: id,
            itemName: document.getElementById(`edit-name-${id}`).value,
            itemBrand: document.getElementById(`edit-brand-${id}`).value,
            itemPrice: parseInt(document.getElementById(`edit-price-${id}`).value),
            dbCategory: parseInt(document.getElementById(`edit-category-${id}`).value),
            dbType: parseInt(document.getElementById(`edit-type-${id}`).value),
            itemStock: parseInt(document.getElementById(`edit-stock-${id}`).value)
        };

        formData.append("itemData", new Blob([JSON.stringify(itemData)], {type: "application/json"}));
        selectedFiles.forEach(file => formData.append("files", file));

        await fetch(`/admin/api/items/${id}`, {
            method: 'PATCH',
            headers: { [header]: token },
            body: formData
        });
        loadProductData();
    };

    loadProductData();
});