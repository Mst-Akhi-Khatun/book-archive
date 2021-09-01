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
  if (books.status === 404) {
    errorDiv.innerText = "NO Result Found";
  } else {
    errorDiv.innerText = "";
  }
    // console.log(books);
    books.forEach(book => {
        // console.log(book.subject[0]);
        // displaySection.classList.add('row');
        const div = document.createElement('div');
        div.classList.add('col-3');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book Name:</h5>          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Author Name: ${book.author_name[0]}</li>
          <li class="list-group-item">Publisher: ${book.publisher[0]}</li>
          <li class="list-group-item">Book First Publish Date: ${book.first_publish_year}</li>
        </ul>
        
      </div></br>
        `
        displaySection.appendChild(div);
    })
}

/* 
<h1>Author Name: ${book.author_name[0]}</h1>
            <h2>Publisher: ${book.publisher[0]}</h2>
            <h5>Book First Publish Date: ${book.first_publish_year}</h5>
*/