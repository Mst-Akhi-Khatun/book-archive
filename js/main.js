const displaySection = document.getElementById("display-section");
const errorDiv = document.getElementById("error");
const resultSection = document.getElementById("result");

// Book loading arrow function
const loadBook = () => {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs,data.numFound))
}
// loadBook();


// Book display arrow function
const displayBook = (books,result) => {
  console.log(result);  
  displaySection.innerHTML = '';

    // Error Handing
  if (books.status === 404) {
    errorDiv.innerText = "NO Result Found";    
  } else {
    errorDiv.innerText = "";
  }
    // console.log(books);
    resultSection.innerText = '';
    const h2 = document.createElement('h2');
    h2.innerText = `Result are found ${result}`;       
    resultSection.appendChild(h2);
    books.forEach(book => {      
        const {title, first_publish_year, author_name, publisher, cover_i} = book;                  
        const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`        
        const div = document.createElement('div');        
        div.classList.add('col');
        div.innerHTML = `        
        <div class="card h-100">
          <img src="${imageUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4>${title}</h4>
            <h6>by ${author_name}</h6>
            <h6>${publisher}</h6>
            <p>First published in ${first_publish_year}</p>
          </div>        
        </div></br>
        `
        displaySection.appendChild(div);
    })
}


