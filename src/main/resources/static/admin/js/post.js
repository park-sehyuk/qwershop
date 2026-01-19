document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('product-list-body');

    const categoryMap = { 13: "BEST", 14: "추천상품", 15: "이달의 상품" };
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

    // 파일 선택 시 미리보기 (가로 스크롤 대응 디자인)
    window.previewEditFiles = function(id) {
        const fileInput = document.getElementById(`edit-file-${id}`);
        const previewContainer = document.getElementById(`preview-container-${id}`);

        // 새로 파일을 선택하면 기존 미리보기(기존이미지 안내 포함)를 비우고 새로 그림
        previewContainer.innerHTML = '';

        if (fileInput.files) {
            Array.from(fileInput.files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const div = document.createElement('div');
                    div.style = "display: inline-flex; flex-direction: column; align-items: center; min-width: 80px; margin-right: 10px; padding: 5px; border: 1px solid #ddd; border-radius: 6px; background: #fff;";
                    div.innerHTML = `
                        <img src="${e.target.result}" style="width:70px; height:70px; object-fit:cover; border-radius:4px;">
                        <div style="display: flex; align-items: center; margin-top: 5px; gap: 3px;">
                            <input type="radio" id="main-${id}-${index}" name="mainImageIdx-${id}" value="${index}" ${index === 0 ? 'checked' : ''} style="cursor:pointer; width:13px; height:13px; margin:0;">
                            <label for="main-${id}-${index}" style="font-size: 11px; font-weight: bold; cursor:pointer; white-space:nowrap; margin:0;">대표</label>
                        </div>
                    `;
                    previewContainer.appendChild(div);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    window.toggleEditMode = function(id) {
        const p = currentItems.find(i => i.itemId === id);
        const row = document.getElementById(`row-${id}`);
        const catOptions = Object.entries(categoryMap).map(([v,n])=> `<option value="${v}" ${p.dbCategory==v?'selected':''}>${n}</option>`).join('');
        const typeOptions = Object.entries(typeMap).map(([v,n])=> `<option value="${v}" ${p.dbType==v?'selected':''}>${n}</option>`).join('');

        row.innerHTML = `
            <td style="padding: 10px; vertical-align: top; width: 300px;">
                <div style="width: 280px; border: 1px solid #eee; border-radius: 6px; background: #fafafa; padding: 8px; box-sizing: border-box;">
                    <div id="preview-container-${id}" style="display: flex; overflow-x: auto; overflow-y: hidden; white-space: nowrap; padding-bottom: 8px; min-height: 100px; scrollbar-width: thin;">
                        <div style="display: inline-flex; flex-direction: column; align-items: center; min-width: 80px; margin-right: 10px; padding: 5px; border: 1px solid #ddd; border-radius: 6px; background: #fff;">
                            <img src="${p.itemUrl || ''}" style="width:70px; height:70px; object-fit:cover; border-radius:4px;">
                            <p style="font-size: 10px; color: #999; margin-top:5px; font-weight:bold;">기존이미지</p>
                        </div>
                    </div>
                    <div style="margin-top: 5px; border-top: 1px solid #eee; padding-top: 8px;">
                        <input type="file" id="edit-file-${id}" multiple style="font-size: 11px; width: 100%; color: #666;" onchange="previewEditFiles(${id})">
                    </div>
                </div>
            </td>
            <td style="vertical-align: middle;">
                <input type="text" id="edit-name-${id}" value="${p.itemName}" style="width:90%; padding:6px; border:1px solid #ddd; border-radius:4px; margin-bottom:4px;">
                <input type="text" id="edit-brand-${id}" value="${p.itemBrand}" style="width:90%; padding:6px; border:1px solid #ddd; border-radius:4px;">
            </td>
            <td style="vertical-align: middle;"><input type="number" id="edit-price-${id}" value="${p.itemPrice}" style="width:85px; padding:6px; border:1px solid #ddd; border-radius:4px;"></td>
            <td style="vertical-align: middle;">
                <select id="edit-cat-${id}" style="width:100%; padding:6px; border:1px solid #ddd; border-radius:4px; margin-bottom:4px;">${catOptions}</select>
                <select id="edit-type-${id}" style="width:100%; padding:6px; border:1px solid #ddd; border-radius:4px;">${typeOptions}</select>
            </td>
            <td style="vertical-align: middle;"><input type="number" id="edit-stock-${id}" value="${p.itemStock}" style="width:65px; padding:6px; border:1px solid #ddd; border-radius:4px;"></td>
            <td style="vertical-align: middle;">-</td>
            <td style="vertical-align: middle; text-align: center;">
                <button onclick="saveEdit(${id})" style="background:#28a745; color:white; border:none; padding:8px 12px; margin-bottom:5px; width:75px; cursor:pointer; border-radius:4px; font-weight:bold;">저장</button>
                <button onclick="loadProductData()" style="background:#6c757d; color:white; border:none; padding:8px 12px; width:75px; cursor:pointer; border-radius:4px; font-weight:bold;">취소</button>
            </td>`;
    };

    window.saveEdit = async function(id) {
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;
        const formData = new FormData();

        // 대표 이미지 인덱스 확보
        const mainImageRadio = document.querySelector(`input[name="mainImageIdx-${id}"]:checked`);
        const mainIdx = mainImageRadio ? parseInt(mainImageRadio.value) : 0;

        const updateData = {
            itemId: id,
            itemName: document.getElementById(`edit-name-${id}`).value,
            itemBrand: document.getElementById(`edit-brand-${id}`).value,
            itemPrice: parseInt(document.getElementById(`edit-price-${id}`).value) || 0,
            dbCategory: parseInt(document.getElementById(`edit-cat-${id}`).value),
            dbType: parseInt(document.getElementById(`edit-type-${id}`).value),
            itemStock: parseInt(document.getElementById(`edit-stock-${id}`).value) || 0,
            mainImageIdx: mainIdx
        };

        formData.append("itemData", new Blob([JSON.stringify(updateData)], {type: "application/json"}));

        const fileInput = document.getElementById(`edit-file-${id}`);
        if (fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append("files", fileInput.files[i]);
            }
        }

        try {
            const res = await fetch(`/admin/api/items/${id}`, {
                method: 'POST',
                headers: { [header]: token },
                body: formData
            });

            if (res.ok) {
                alert("성공적으로 수정되었습니다.");
                loadProductData();
            } else {
                const errorMsg = await res.text();
                // 413 에러 등이 발생하면 여기서 메시지를 띄움
                alert("수정 실패: " + errorMsg);
            }
        } catch (err) {
            alert("서버 통신 오류가 발생했습니다.");
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
                alert("삭제되었습니다.");
                loadProductData();
            } else {
                res.text().then(msg => alert("삭제 실패: " + msg));
            }
        });
    };

    loadProductData();
});