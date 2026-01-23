document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('product-list-body');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryGrid = document.getElementById('gallery-grid');

    const categoryMap = { 13: "BEST", 14: "추천상품", 15: "이달의 상품" };

    // 이 부분이 누락되어 에러가 났던 것입니다. 전체 다시 넣어드립니다.
    const typeMap = {
        16: "New", 17: "Best", 18: "남성상의-반팔", 19: "남성상의-긴팔", 20: "남성상의-맨투맨", 21: "남성상의-니트", 22: "남성상의-아우터",
        23: "남성하의-반바지", 24: "남성하의-슬랙스", 25: "남성하의-청바지", 26: "남성하의-면바지", 27: "남성하의-트랙팬츠", 28: "남성신발-러닝화",
        29: "남성신발-스니커즈", 30: "남성신발-구두", 31: "남성신발-샌들", 32: "남성신발-슬리퍼", 33: "남성그 외-양말", 34: "남성그 외-가방",
        35: "남성그 외-악세사리", 36: "남성그 외-모자", 37: "여성상의-반팔", 38: "여성상의-긴팔", 39: "여성상의-맨투맨", 40: "여성상의-니트",
        41: "여성상의-아우터", 42: "여성하의-반바지", 43: "여성하의-슬랙스", 44: "여성하의-청바지", 45: "여성하의-면바지", 46: "여성하의-트랙팬츠",
        47: "여성신발-러닝화", 48: "여성신발-스니커즈", 49: "여성신발-구두", 50: "여성신발-샌들", 51: "여성신발-슬리퍼", 52: "여성그 외-양말",
        53: "여성그 외-가방", 54: "여성그 외-악세사리", 55: "여성그 외-모자", 56: "아동상의-반팔", 57: "아동상의-긴팔", 58: "아동상의-맨투맨",
        59: "아동상의-니트", 60: "아동상의-아우터", 61: "아동하의-반바지", 62: "아동하의-슬랙스", 63: "아동하의-청바지", 64: "아동하의-면바지",
        65: "아동하의-트랙팬츠", 66: "아동신발-러닝화", 67: "아동신발-스니커즈", 68: "아동신발-구두", 69: "아동신발-샌들", 70: "아동신발-슬리퍼",
        71: "아동그 외-양말", 72: "아동그 외-가방", 73: "아동그 외-악세사리", 74: "아동그 외-모자", 75: "Men", 76: "Men-상의", 77: "Men-하의",
        78: "Men-신발", 79: "Men-그 외", 80: "Women", 81: "women-상의", 82: "women-하의", 83: "women-신발", 84: "women-그 외", 85: "Kids",
        86: "kids-상의", 87: "kids-하의", 88: "kids-신발", 89: "kids-그 외"
    };

    let currentItems = [];
    let selectedImagesForEdit = [];

    window.loadProductData = function() {
        fetch('/admin/api/items')
            .then(res => res.json())
            .then(data => {
                currentItems = data;
                tableBody.innerHTML = '';
                data.forEach(p => renderRow(p));
            })
            .catch(err => console.error("데이터 로드 실패:", err));
    };

    function renderRow(p) {
        const row = document.createElement('tr');
        row.id = `row-${p.itemId}`;
        row.innerHTML = `
            <td><img src="${p.itemUrl || '/admin/img/no-image.png'}" style="width:60px; height:60px; object-fit:cover; border-radius:4px;"></td>
            <td style="text-align:left; padding-left:10px;"><strong>${p.itemName}</strong><br><small>${p.itemBrand}</small></td>
            <td>${(p.itemPrice || 0).toLocaleString()}원</td>
            <td>${categoryMap[p.dbCategory] || '일반'}<br><strong>${typeMap[p.dbType] || '미지정'}</strong></td>
            <td>${p.itemStock}개</td>
            <td>${p.regTime ? p.regTime.split('T')[0] : '-'}</td>
            <td>
                <button onclick="toggleEditMode(${p.itemId})" style="background:#ffc107; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">수정</button>
                <button onclick="deleteItem(${p.itemId})" style="background:#dc3545; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">삭제</button>
            </td>`;
        tableBody.appendChild(row);
    }

    // 수정 시 갤러리 열기
    window.openGalleryForEdit = async function(id) {
        try {
            const res = await fetch('/admin/api/internal-files');
            const fileList = await res.json();
            galleryGrid.innerHTML = '';
            fileList.forEach(fileName => {
                const img = document.createElement('img');
                img.src = `/admin/posting/${fileName}`;
                img.style = "width:100%; height:110px; object-fit:cover; cursor:pointer; border-radius:6px; border:2px solid #eee;";
                img.onclick = () => {
                    if (!selectedImagesForEdit.includes(fileName)) {
                        selectedImagesForEdit.push(fileName);
                        renderEditPreview(id);
                    }
                    closeGallery();
                };
                galleryGrid.appendChild(img);
            });
            galleryModal.style.display = 'block';
            galleryOverlay.style.display = 'block';
        } catch (e) { alert("갤러리 로딩 실패"); }
    };

    window.closeGallery = function() {
        galleryModal.style.display = 'none';
        galleryOverlay.style.display = 'none';
    };

    function renderEditPreview(id) {
        const previewContainer = document.getElementById(`preview-container-${id}`);
        if (!previewContainer) return;
        previewContainer.innerHTML = '';
        selectedImagesForEdit.forEach((name, index) => {
            const div = document.createElement('div');
            div.style = `display: inline-flex; flex-direction: column; align-items: center; min-width: 80px; margin-right: 10px; padding: 5px; border: 2px solid ${index === 0 ? '#007bff' : '#ddd'}; border-radius: 6px; background: ${index === 0 ? '#f0f7ff' : '#fff'}; position:relative; cursor:pointer;`;

            div.onclick = (e) => {
                if (e.target.classList.contains('remove-img-btn')) return;
                if (index !== 0) {
                    const selected = selectedImagesForEdit.splice(index, 1)[0];
                    selectedImagesForEdit.unshift(selected);
                    renderEditPreview(id);
                }
            };

            div.innerHTML = `
                <img src="/admin/posting/${name}" style="width:70px; height:70px; object-fit:cover; border-radius:4px;">
                <div style="display: flex; align-items: center; margin-top: 5px; gap: 3px;">
                    <span style="font-size: 10px; font-weight: bold; color: ${index === 0 ? '#007bff' : '#666'};">
                        ${index === 0 ? '★대표' : '[변경]'}
                    </span>
                    <button type="button" class="remove-img-btn" style="margin-left:5px; border:none; background:#ff4d4d; color:white; border-radius:50%; width:18px; height:18px; font-size:12px; cursor:pointer;">&times;</button>
                </div>`;

            div.querySelector('.remove-img-btn').onclick = (e) => {
                e.stopPropagation();
                selectedImagesForEdit.splice(index, 1);
                renderEditPreview(id);
            };
            previewContainer.appendChild(div);
        });
    }

    window.toggleEditMode = function(id) {
        const p = currentItems.find(i => i.itemId === id);
        const row = document.getElementById(`row-${id}`);
        selectedImagesForEdit = p.itemUrl ? [p.itemUrl.split('/').pop()] : [];
        const catOptions = Object.entries(categoryMap).map(([v,n])=> `<option value="${v}" ${p.dbCategory==v?'selected':''}>${n}</option>`).join('');
        const typeOptions = Object.entries(typeMap).map(([v,n])=> `<option value="${v}" ${p.dbType==v?'selected':''}>${n}</option>`).join('');

        row.innerHTML = `
            <td style="padding: 10px; vertical-align: top; width: 300px;">
                <div style="width: 280px; border: 1px solid #eee; border-radius: 6px; background: #fafafa; padding: 8px; box-sizing: border-box;">
                    <div id="preview-container-${id}" style="display: flex; overflow-x: auto; white-space: nowrap; padding-bottom: 8px; min-height: 100px; scrollbar-width: thin;"></div>
                    <button type="button" onclick="openGalleryForEdit(${id})" style="width:100%; padding:5px; background:#fff; border:1px dashed #007bff; color:#007bff; border-radius:4px; font-size:11px; cursor:pointer; font-weight:bold; margin-top:5px;">+ 추가</button>
                </div>
            </td>
            <td><input type="text" id="edit-name-${id}" value="${p.itemName}" style="width:90%;"><br><input type="text" id="edit-brand-${id}" value="${p.itemBrand}" style="width:90%;"></td>
            <td><input type="number" id="edit-price-${id}" value="${p.itemPrice}" style="width:80px;"></td>
            <td><select id="edit-cat-${id}">${catOptions}</select><br><select id="edit-type-${id}">${typeOptions}</select></td>
            <td><input type="number" id="edit-stock-${id}" value="${p.itemStock}" style="width:60px;"></td>
            <td>-</td>
            <td><button onclick="saveEdit(${id})">저장</button><br><button onclick="loadProductData()">취소</button></td>`;
        renderEditPreview(id);
    };

    window.saveEdit = async function(id) {
        const csrfToken = document.querySelector('meta[name="_csrf"]');
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]');
        if (selectedImagesForEdit.length === 0) return alert("이미지를 하나 이상 선택하세요.");
        const updateData = {
            itemId: id,
            itemName: document.getElementById(`edit-name-${id}`).value,
            itemBrand: document.getElementById(`edit-brand-${id}`).value,
            itemPrice: parseInt(document.getElementById(`edit-price-${id}`).value) || 0,
            dbCategory: parseInt(document.getElementById(`edit-cat-${id}`).value),
            dbType: parseInt(document.getElementById(`edit-type-${id}`).value),
            itemStock: parseInt(document.getElementById(`edit-stock-${id}`).value) || 0,
            imageNames: selectedImagesForEdit
        };
        try {
            const headers = { 'Content-Type': 'application/json' };
            if (csrfHeader && csrfToken) headers[csrfHeader.content] = csrfToken.content;
            const res = await fetch(`/admin/api/items/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify(updateData) });
            if (res.ok) { alert("수정 완료!"); loadProductData(); }
        } catch (err) { alert("서버 통신 오류"); }
    };

    window.deleteItem = function(id) {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const csrfToken = document.querySelector('meta[name="_csrf"]');
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]');
        const headers = {};
        if (csrfHeader && csrfToken) headers[csrfHeader.content] = csrfToken.content;
        fetch(`/admin/api/items/${id}`, { method: 'DELETE', headers: headers }).then(res => {
            if (res.ok) { alert("삭제 성공"); loadProductData(); }
        });
    };

    loadProductData();
});