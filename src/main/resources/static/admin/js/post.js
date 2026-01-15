document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('product-list-body');

    const categoryMap = { 13: "BEST", 14: "추천상품", 15: "이달의 상품" };
    const typeMap = {
        16: "New", 17: "Best", 18: "남성상의-반팔", 19: "남성상의-긴팔",
        20: "남성상의-맨투맨", 21: "남성상의-니트", 22: "남성상의-아우터",
        23: "남성하의-반바지", 24: "남성하의-슬랙스", 25: "남성하의-청바지",
        26: "남성하의-면바지", 27: "남성하의-트랙팬츠", 28: "남성신발-러닝화",
        29: "남성신발-스니커즈", 30: "남성신발-구두", 31: "남성신발-샌들",
        32: "남성신발-슬리퍼", 33: "남성그 외-양말", 34: "남성그 외-가방",
        35: "남성그 외-악세사리", 36: "남성그 외-모자", 37: "여성상의-반팔",
        38: "여성상의-긴팔", 39: "여성상의-맨투맨", 40: "여성상의-니트",
        41: "여성상의-아우터", 42: "여성하의-반바지", 43: "여성하의-슬랙스",
        44: "여성하의-청바지", 45: "여성하의-면바지", 46: "여성하의-트랙팬츠",
        47: "여성신발-러닝화", 48: "여성신발-스니커즈", 49: "여성신발-구두",
        50: "여성신발-샌들", 51: "여성신발-슬리퍼", 52: "여성그 외-양말",
        53: "여성그 외-가방", 54: "여성그 외-악세사리", 55: "여성그 외-모자",
        56: "아동상의-반팔", 57: "아동상의-긴팔", 58: "아동상의-맨투맨",
        59: "아동상의-니트", 60: "아동상의-아우터", 61: "아동하의-반바지",
        62: "아동하의-슬랙스", 63: "아동하의-청바지", 64: "아동하의-면바지",
        65: "아동하의-트랙팬츠", 66: "아동신발-러닝화", 67: "아동신발-스니커즈",
        68: "아동신발-구두", 69: "아동신발-샌들", 70: "아동신발-슬리퍼",
        71: "아동그 외-양말", 72: "아동그 외-가방", 73: "아동그 외-악세사리",
        74: "아동그 외-모자", 75: "Men", 76: "Men-상의", 77: "Men-하의",
        78: "Men-신발", 79: "Men-그 외", 80: "Women", 81: "women-상의",
        82: "women-하의", 83: "women-신발", 84: "women-그 외", 85: "Kids",
        86: "kids-상의", 87: "kids-하의", 88: "kids-신발", 89: "kids-그 외"
    };

    let currentItems = [];

    window.loadProductData = function() {
        fetch('/admin/api/items').then(res => res.json()).then(data => {
            currentItems = data;
            tableBody.innerHTML = '';
            data.forEach(p => renderRow(p));
        });
    };

    function renderRow(p) {
        const row = document.createElement('tr');
        row.id = `row-${p.itemId}`;
        row.innerHTML = `
            <td><img src="${p.itemUrl || '/admin/img/no-image.png'}" style="width:60px; height:60px; object-fit:cover;"></td>
            <td style="text-align:left; padding-left:10px;"><strong>${p.itemName}</strong><br><small>${p.itemBrand}</small></td>
            <td>${p.itemPrice.toLocaleString()}원</td>
            <td>${categoryMap[p.dbCategory] || '일반'}<br><strong>${typeMap[p.dbType] || '미지정'}</strong></td>
            <td>${p.itemStock}개</td>
            <td>${p.regTime ? p.regTime.split('T')[0] : '-'}</td>
            <td>
                <button onclick="toggleEditMode(${p.itemId})" style="background:#ffc107; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">수정</button>
                <button onclick="deleteItem(${p.itemId})" style="background:#dc3545; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">삭제</button>
            </td>`;
        tableBody.appendChild(row);
    }

    window.toggleEditMode = function(id) {
        const p = currentItems.find(i => i.itemId === id);
        const row = document.getElementById(`row-${id}`);

        const catOptions = Object.entries(categoryMap).map(([v,n])=>
            `<option value="${v}" ${p.dbCategory==v?'selected':''}>${n}</option>`).join('');

        const typeOptions = Object.entries(typeMap).map(([v,n])=>
            `<option value="${v}" ${p.dbType==v?'selected':''}>${n}</option>`).join('');

        row.innerHTML = `
            <td>
                <img src="${p.itemUrl || ''}" style="width:50px; display:block; margin-bottom:5px;">
                <input type="file" id="edit-file-${id}" multiple style="width:70px; font-size:10px;">
            </td>
            <td>
                <input type="text" id="edit-name-${id}" value="${p.itemName}" style="width:90%"><br>
                <input type="text" id="edit-brand-${id}" value="${p.itemBrand}" style="width:90%">
            </td>
            <td><input type="number" id="edit-price-${id}" value="${p.itemPrice}" style="width:80px"></td>
            <td>
                <select id="edit-cat-${id}" style="width:100%">${catOptions}</select>
                <select id="edit-type-${id}" style="width:100%; margin-top:5px;">${typeOptions}</select>
            </td>
            <td><input type="number" id="edit-stock-${id}" value="${p.itemStock}" style="width:60px"></td>
            <td>-</td>
            <td>
                <button onclick="saveEdit(${id})" style="background:#28a745; color:white; border:none; padding:5px; margin-bottom:2px; width:50px; cursor:pointer;">저장</button>
                <button onclick="loadProductData()" style="background:#6c757d; color:white; border:none; padding:5px; width:50px; cursor:pointer;">취소</button>
            </td>`;
    };

    window.saveEdit = async function(id) {
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        const formData = new FormData();

        // 1. 텍스트 데이터 (Blob으로 감싸서 JSON으로 전달)
        const updateData = {
            itemName: document.getElementById(`edit-name-${id}`).value,
            itemBrand: document.getElementById(`edit-brand-${id}`).value,
            itemPrice: parseInt(document.getElementById(`edit-price-${id}`).value),
            dbCategory: parseInt(document.getElementById(`edit-cat-${id}`).value),
            dbType: parseInt(document.getElementById(`edit-type-${id}`).value),
            itemStock: parseInt(document.getElementById(`edit-stock-${id}`).value)
        };
        formData.append("itemData", new Blob([JSON.stringify(updateData)], {type: "application/json"}));

        // 2. 이미지 파일 추가
        const fileInput = document.getElementById(`edit-file-${id}`);
        if (fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append("files", fileInput.files[i]);
            }
        }

        // 3. 서버 전송 (이미지 포함 시 Multipart 전송을 위해 POST 사용)
        const res = await fetch(`/admin/api/items/${id}`, {
            method: 'POST',
            headers: {
                [header]: token
            },
            body: formData
        });

        if (res.ok) {
            alert("수정 완료");
            loadProductData();
        } else {
            alert("수정 실패");
        }
    };

    window.deleteItem = function(id) {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        fetch(`/admin/api/items/${id}`, {
            method: 'DELETE',
            headers: { [header]: token }
        }).then(res => {
            if (res.ok) {
                alert("삭제 성공");
                loadProductData();
            } else {
                res.text().then(msg => alert("삭제 실패: " + msg));
            }
        });
    };

    loadProductData();
});