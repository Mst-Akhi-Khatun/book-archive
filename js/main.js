// taking all elements by id
const displaySection = document.getElementById("display-section");
const errorDiv = document.getElementById("error");
const resultSection = document.getElementById("result");

// spinner
const toggleSpinner = displayStyle => {
  document.getElementById("spinner").style.display = displayStyle;
}


// Book loading by arrow function
const loadBook = () => {
  toggleSpinner('block');
    const searchInput = document.getElementById("search-input");    
    const searchText = searchInput.value;
    
    // clear previous elements
    displaySection.innerHTML = '';
    resultSection.innerHTML = '';
    searchInput.value = '';
    errorDiv.value = '';
    if (searchText === '') {
      errorDiv.innerText = "Search field cannot be empty.";
      return;
    }
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs)) 
}
// loadBook();


// Book display arrow function
const displayBook = (books) => {  
  resultSection.innerHTML = `Total Search Results: ${books.length}`
   
    // Error Handling
  if (books.length === 0) {
    errorDiv.innerText = "NO Result Found";       
  } else {
    errorDiv.innerText = "";
  }
   // single book element
    books.forEach(book => {            
        const {title, first_publish_year, author_name, publisher, cover_i} = book;                  
        const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const defaultImg = 'images/Image-1.png';        
        const div = document.createElement('div');             
        div.innerHTML = `        
        <div class="col h-75">
            <div class="card h-100">
                <img src="${cover_i ? imageUrl : defaultImg}" class="card-img-top h-50 p-1" alt="book image">
                <div class="card-body overflow-auto pt-2">
                    <h4 class="card-title">${title.slice(0, 30)}</h4>
                    <h6 class="card-text"><strong>By:</strong> ${author_name ? author_name : 'no name found'}</h6>
                    <h6 class="card-text"><strong>Publisher:</strong> ${publisher ? publisher[0] : 'no name found'}</h6>
                    <h6 class="card-text">First published in <strong>${first_publish_year ? first_publish_year : '...'}</strong></h6>
                </div>
                <div class="card-footer bg-success py-2 text-center pt-1">
                    <small class="text-white">Read Now</small>
                </div>
            </div>
        </div>
        `;
        displaySection.appendChild(div);
    })
}


