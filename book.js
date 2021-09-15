
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("result-count");
const bookContainer = document.getElementById("book-container");
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  const search = searchInput.value;
  if (search === "") {
    return;
  }
  searchInput.value = '';
  const url = `https://openlibrary.org/search.json?q=${search}`;
  bookContainer.innerHTML = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showData(data);
    })
    .finally(() => {
      searchInput.value === "";
    });
});
function showData(data) {
  resultCount.innerText = data.numFound;
  data.docs.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
          <!-- Image -->
          <div class="rounded overflow-hidden border p-2">
            <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="${item.title_suggest}/>
          </div>
          <div class=" py-2 d-flex  justify-content-between align-items-center d-md-block text-md-center">
            <h4>${item.title}</h4>
            <p>Author:  ${item.author_name?.[0]}</p>
            <p>Publisher:${item.publisher ? item.publisher[0] : 'Not Found'}</p>
            <p>First Published: ${item.first_publish_year ? item.first_publish_year[0] : 'Not Found'}</p>
            
          </div>
          `;

    bookContainer.appendChild(div);
  });
}
