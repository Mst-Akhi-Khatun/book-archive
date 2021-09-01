const displaySection = document.getElementById("display-section");
const errorDiv = document.getElementById("error");

const loadBook = () => {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs))
}
// loadBook();

const displayBook = (books) => {
    
    // Error Handing
  /* if (books.status === 404) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  } */
    // console.log(books);
    books.forEach(book => {
        const {title, first_publish_year, author_name, publisher} = book;
        console.log(title)               
        const imageId = book.cover_i;
        const imageUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4>${title}</h4>
                        <p>${first_publish_year}</p>
                    </div>
        
        
      </div></br>
        `
        displaySection.appendChild(div);
    })
}


