document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-product-form');
    const fileInput = document.getElementById('p-image-file');
    const addImgBtn = document.getElementById('add-img-btn');
    const previewContainer = document.getElementById('image-preview-container');
    let selectedFiles = [];

    if (addImgBtn) addImgBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => { selectedFiles.push(file); });
        renderPreviews();
        fileInput.value = "";
    });

    function renderPreviews() {
        previewContainer.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgBox = document.createElement('div');
                imgBox.className = 'image-box';
                imgBox.style.position = 'relative';
                imgBox.style.cursor = 'pointer';

                let html = `<img src="${event.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:5px; border:1px solid #ddd;">`;
                if (index === 0) {
                    html += `<div style="position:absolute; top:0; left:0; background:#007bff; color:white; font-size:11px; padding:2px 6px; border-radius:4px 0 4px 0; font-weight:bold;">대표</div>
                             <div style="position:absolute; inset:0; border:3px solid #007bff; border-radius:5px; pointer-events:none;"></div>`;
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '×';
                deleteBtn.style = "position:absolute; top:-5px; right:-5px; width:20px; height:20px; border-radius:50%; background:#ff3547; color:white; border:none; cursor:pointer; z-index:10;";
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    selectedFiles.splice(index, 1);
                    renderPreviews();
                };

                imgBox.innerHTML = html;
                imgBox.appendChild(deleteBtn);
                imgBox.onclick = () => {
                    if (index !== 0) {
                        const picked = selectedFiles.splice(index, 1)[0];
                        selectedFiles.unshift(picked);
                        renderPreviews();
                    }
                };
                previewContainer.appendChild(imgBox);
            };
            reader.readAsDataURL(file);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;
        const formData = new FormData();

        const itemData = {
            itemName: document.getElementById('itemName').value,
            itemBrand: document.getElementById('itemBrand').value,
            itemPrice: parseInt(document.getElementById('itemPrice').value) || 0,
            itemStock: parseInt(document.getElementById('itemStock').value) || 0,
            dbCategory: parseInt(document.getElementById('itemCategory').value),
            dbType: parseInt(document.getElementById('itemTypeSelect').value)
        };

        formData.append("itemData", new Blob([JSON.stringify(itemData)], { type: "application/json" }));
        selectedFiles.forEach(file => formData.append("files", file));

        try {
            const res = await fetch('/admin/api/items', {
                method: 'POST',
                headers: { [header]: token },
                body: formData
            });
            if (res.ok) { alert("등록 성공!"); location.href = "/admin/itemList"; }
            else { alert("서버 등록 실패"); }
        } catch (error) { alert("통신 오류"); }
    });
});