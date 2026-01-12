document.addEventListener('DOMContentLoaded', function() {
    const addImgBtn = document.getElementById('add-img-btn');
    const fileInput = document.getElementById('p-image-file');
    const previewContainer = document.getElementById('image-preview-container');
    const productForm = document.getElementById('add-product-form');
    let selectedImages = [];

    addImgBtn.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                selectedImages.push(ev.target.result);
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });
        fileInput.value = "";
    };

    function renderPreviews() {
        previewContainer.innerHTML = "";
        selectedImages.forEach((src, index) => {
            const div = document.createElement('div');
            div.className = 'image-box';
            div.style.position = 'relative';
            const badge = index === 0 ? '<span style="position:absolute; background:black; color:yellow; font-size:10px; padding:2px;">대표</span>' : '';
            div.innerHTML = `${badge}<img src="${src}" style="width:100%; height:100%; object-fit:cover;"><button type="button" onclick="removeImage(${index})" style="position:absolute; right:0; top:0;">×</button>`;
            previewContainer.appendChild(div);
        });
    }

    window.removeImage = (i) => { selectedImages.splice(i, 1); renderPreviews(); };

    productForm.onsubmit = async function(e) {
        e.preventDefault();
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        const data = {
            itemName: document.getElementById('itemName').value,
            itemBrand: document.getElementById('itemBrand').value,
            itemPrice: parseInt(document.getElementById('itemPrice').value),
            itemStock: parseInt(document.getElementById('itemStock').value),
            dbCategory: parseInt(document.getElementById('itemCategory').value),
            dbType: parseInt(document.getElementById('itemTypeSelect').value),
            itemUrls: selectedImages
        };

        const res = await fetch('/admin/addpost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', [header]: token },
            body: JSON.stringify(data)
        });

        if (res.ok) { alert("등록 완료"); location.href="/admin/itemList"; }
    };
});