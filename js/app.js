// Load Book details

const loadBookDetails = () => {
    const searchText = document.getElementById('search-field').value;
    // clear input field
    document.getElementById('search-field').value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data))
}

// display book details

const displayBookDetails = data => {
    const bookContainer = document.getElementById('book-container');

    // clear previous result

    bookContainer.textContent = '';

    if (data.numFound === 0) {
        document.getElementById('no-result').style.display = 'block';
    }
    else {

        // result found

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('span-2');
        resultDiv.innerHTML = `<h3>${data.numFound} result found</h3>`
        bookContainer.appendChild(resultDiv);

        // books display

        const books = (data.docs).slice(0, 30);
        books.forEach(book => {
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="bg-white px-5 py-3 rounded-3">
            <div class="row d-flex align-items-center">
                <div class="col-md-9">
                    <h3>${book.title}</h3>
                    <p><span class="fw-bold">Author:</span> ${book.author_name[0]}</p>
                    <p><span class="fw-bold">Publisher:</span> ${book.publisher[0]}</p>
                    <p><span class="fw-bold">First Published Year</span> ${book.first_publish_year}</p>
                </div>
                <div class="col-md-3 d-flex justify-content-end">
                    <img class="w-75" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 10909258}-M.jpg" alt="">
                </div>
            </div>
        </div>
        `
            bookContainer.appendChild(div);
            document.getElementById('no-result').style.display = 'none';
        })
    }
}