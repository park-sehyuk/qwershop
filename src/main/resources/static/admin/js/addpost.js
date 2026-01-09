document.addEventListener('DOMContentLoaded', function() {
    const addImgBtn = document.getElementById('add-img-btn');
    const fileInput = document.getElementById('p-image-file');
    const previewContainer = document.getElementById('image-preview-container');
    const productForm = document.getElementById('add-product-form');
    let selectedImages = [];

    if (addImgBtn) addImgBtn.onclick = () => fileInput.click();

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
            const mainBadge = (index === 0) ? `<span style="position:absolute; top:5px; left:5px; background:rgba(0,0,0,0.7); color:yellow; font-size:11px; padding:2px 6px; border-radius:3px; font-weight:bold; z-index:5;">대표</span>` : "";
            div.innerHTML = `${mainBadge}<img src="${src}" style="width:100%; height:100%; object-fit:cover;"><button type="button" onclick="removeImage(${index})" style="position:absolute; top:0; right:0; background:rgba(0,0,0,0.5); color:white; border:none; cursor:pointer; width:20px; height:20px;">×</button>`;
            previewContainer.appendChild(div);
        });
    }

    window.removeImage = (index) => {
        selectedImages.splice(index, 1);
        renderPreviews();
    };

    productForm.onsubmit = async function(e) {
        e.preventDefault();
        const token = document.querySelector('meta[name="_csrf"]').content;
        const header = document.querySelector('meta[name="_csrf_header"]').content;

        const data = {
            itemName: document.getElementById('itemName').value,
            itemBrand: document.getElementById('itemBrand').value,
            itemPrice: parseInt(document.getElementById('itemPrice').value) || 0,
            itemStock: parseInt(document.getElementById('itemStock').value) || 0,
            dbCategory: parseInt(document.getElementById('itemCategory').value),
            dbType: parseInt(document.getElementById('itemTypeSelect').value),
            itemUrls: selectedImages
        };

        try {
            const res = await fetch('/admin/addpost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', [header]: token },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("제품이 성공적으로 등록되었습니다!");
                location.href = "/admin/itemList";
            } else {
                alert("등록 실패: 데이터 형식을 확인하세요.");
            }
        } catch (error) {
            alert("통신 오류 발생");
        }
    };
});