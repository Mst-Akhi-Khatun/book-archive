// taking all elements by id
const displaySection = document.getElementById("display-section");
const errorDiv = document.getElementById("error");
const resultSection = document.getElementById("result");
const searchInput = document.getElementById("search-input");  

// spinner
const toggleSpinner = displayStyle => {
  document.getElementById("spinner").style.display = displayStyle;
}
// clear previous elements
const emptyElement = () => {
  displaySection.innerHTML = '';
  resultSection.innerHTML = '';   
  errorDiv.innerHTML = '';
}
// Book loading by arrow function
const loadBook = () => {
  emptyElement();  //clear elements 
  toggleSpinner('block'); //add spinner      
  const searchText = searchInput.value;  
    if (searchText === '') {
      toggleSpinner('none'); 
      errorDiv.innerHTML = `
        <p class="text-center w-25 mx-auto p-2 bg-danger text-white">
            Input field can't be empty!
        </p>`;
      return;
    }
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs))
    searchInput.value = ''; 
}
// display Book arrow function
const displayBook = (books) => {
  toggleSpinner('none');  
  resultSection.innerHTML = `Total Search Results: ${books.length}`   
    // Error Handling
  if (books.length === 0) {
    errorDiv.innerHTML = `
    <p class="text-center w-25 mx-auto p-2 bg-danger text-white">
        NO RESULTS FOUND!
    </p>`;       
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
                    <h4 class="card-title">${title}</h4>
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


