// 헤더가 로드된 후에 실행될 코드들
document.addEventListener('DOMContentLoaded', function () {
  // 이제 이 코드는 header.html이 HTML 문서에 완전히 삽입된 후에 실행될 거예요.

  const searchInput = document.getElementById('search');
  const searchBtn = document.getElementById('searchBtn');
  const searchResultDiv = document.getElementById('searchResult');
  const srBtn = document.getElementById('srBtn');
  const clearButton = document.getElementById('clear');

  // 모든 요소가 잘 찾아졌는지 한 번 더 확인 (안전장치)
  if (searchBtn && searchResultDiv && searchInput && srBtn && clearButton) {
    searchBtn.addEventListener('click', function () {
      if (
        searchResultDiv.style.display === 'none' ||
        searchResultDiv.style.display === ''
      ) {
        searchResultDiv.style.display = 'block';
      } else {
        searchResultDiv.style.display = 'none';
        searchInput.value = '';
      }
    });

    const popularSearch = document.querySelectorAll('#srMid ul li button');
    const searchResultPage = '../search/searchResult.html'; // 경로 수정: root 기준으로 '../search/searchResult.html'

    popularSearch.forEach((button) => {
      button.addEventListener('click', function () {
        const searchText = this.textContent;
        const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
          searchText
        )}`;
        window.location.href = targetUrl;
      });
    });

    searchInput.addEventListener('input', function () {
      if (searchInput.value.length > 0) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }
    });

    srBtn.addEventListener('click', function () {
      const enteredText = searchInput.value;
      if (enteredText) {
        const targetUrl = `${searchResultPage}?query=${encodeURIComponent(
          enteredText
        )}`;
        window.location.href = targetUrl;
      } else {
        alert('검색어를 입력해주세요!');
      }
    });

    clearButton.addEventListener('click', function () {
      searchInput.value = '';
    });
  } else {
    console.error(
      '헤더 스크립트: 검색 관련 요소를 찾을 수 없습니다. HTML ID를 확인해주세요.'
    );
  }
});
