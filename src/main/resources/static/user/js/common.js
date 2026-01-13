$(function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchResultDiv = document.getElementById("searchResult");
  const searchInput = document.getElementById("search");
  const srBtn = document.getElementById("srBtn");
  const clearButton = document.getElementById("clear");
  const searchResultPage = "/search";

  if (searchBtn && searchResultDiv) {
    searchBtn.addEventListener("click", function () {
      if (searchResultDiv.style.display === "none" || searchResultDiv.style.display === "") {
        searchResultDiv.style.display = "block";
      } else {
        searchResultDiv.style.display = "none";
        searchInput.value = "";
      }
    });
  }

  const popularSearch = document.querySelectorAll("#srMid ul li button");
  popularSearch.forEach((button) => {
    button.addEventListener("click", function () {
      const searchText = this.textContent;
      window.location.href = `${searchResultPage}?query=${encodeURIComponent(searchText)}`;
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      clearButton.style.display = searchInput.value.length > 0 ? "block" : "none";
    });
  }

  if (srBtn) {
    srBtn.addEventListener("click", function () {
      const enteredText = searchInput.value;
      if (enteredText) {
        window.location.href = `${searchResultPage}?query=${encodeURIComponent(enteredText)}`;
      } else {
        alert("검색어를 입력해주세요!");
      }
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      searchInput.value = "";
      clearButton.style.display = "none";
    });
  }
});