function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveBooksToLocalStorage(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = ""; 

    const books = loadBooksFromLocalStorage();

    if (books.length === 0) {
        booksContainer.innerHTML = "<p>No books available.</p>";
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
            <h4>${book.title}</h4>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <img src="${book.imgurl}" alt="${book.title}" style="width: 100px; height: auto;">
            <button onclick="editBook('${book.title}')">Edit</button>
            <button onclick="deleteBook('${book.title}')">Delete</button>
        `;
        booksContainer.appendChild(bookCard);
    });
}

document.getElementById("addBookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newBook = { 
        title: document.getElementById("bookTitle").value,
        author: document.getElementById("bookAuthor").value,
        genre: document.getElementById("bookGenre").value,
        price: document.getElementById("bookPrice").value,
        imgurl: document.getElementById("bookImage").value,
    };

    const books = loadBooksFromLocalStorage();
    const existingBook = books.find(book => book.title === newBook.title);

    if (existingBook) {
        alert("Book already added.");
        return; 
    }

    const updatedBooks = [...books, newBook];
    saveBooksToLocalStorage(updatedBooks);
    displayBooks(); 
    document.getElementById("bookTitle").value="";
            document.getElementById("bookAuthor").value="";
            document.getElementById("bookGenre").value="";
            document.getElementById("bookPrice").value="";
            document.getElementById("bookImage").value="";
});

function editBook(bookTitle) {
    document.getElementById("addBookForm").style.display="none";
    document.getElementById("heading3").innerText="Edit the Details";
    const books = loadBooksFromLocalStorage();
    const bookToEdit = books.find(book => book.title === bookTitle);

    if (bookToEdit) {
        document.getElementById("editBookForm").style.display = "block"; 
        document.getElementById("editbookTitle").value = bookToEdit.title;
        document.getElementById("editbookAuthor").value = bookToEdit.author;
        document.getElementById("editbookGenre").value = bookToEdit.genre;
        document.getElementById("editbookPrice").value = bookToEdit.price;
        document.getElementById("editbookImage").value = bookToEdit.imgurl;

        document.getElementById("editBookForm").onsubmit = function(event) {
            event.preventDefault();

            bookToEdit.title = document.getElementById("editbookTitle").value;
            bookToEdit.author = document.getElementById("editbookAuthor").value;
            bookToEdit.genre = document.getElementById("editbookGenre").value;
            bookToEdit.price = document.getElementById("editbookPrice").value;
            bookToEdit.imgurl = document.getElementById("editbookImage").value;

            saveBooksToLocalStorage(books);
            document.getElementById("addBookForm").style.display="block";
            document.getElementById("editBookForm").style.display = "none";
            document.getElementById("heading3").innerText="Add New Book";
            document.getElementById("bookTitle").value="";
            document.getElementById("bookAuthor").value="";
            document.getElementById("bookGenre").value="";
            document.getElementById("bookPrice").value="";
            document.getElementById("bookImage").value="";
            displayBooks();
        };
    }
}

function deleteBook(bookTitle) {
    const books = loadBooksFromLocalStorage();
    const updatedBooks = books.filter(book => book.title !== bookTitle);

    saveBooksToLocalStorage(updatedBooks); 
    displayBooks(); 
}

displayBooks();
