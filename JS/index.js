const genres = ["Fiction", "Non-Fiction", "Science", "History", "Fantasy", "Biography", "Mystery", "Romance", "Horror", "Self-Help"];

const books = [
    { id: 1, 
        title: "To Kill a Mockingbird", 
        author: "Harper Lee", 
        genre: "Fiction", 
        price: "₹899" ,
        imgurl:"./Images/tokillamockingbird.jpg"
    },

    { id: 2, 
        title: "A Brief History of Time", 
        author: "Stephen Hawking", 
        genre: "Science", 
        price: "₹1299",
        imgurl:"./Images/BriefHistoryTime.jpg"
     },

    { id: 3, 
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        genre: "Fiction", 
        price: "₹999",
        imgurl:"./Images/greatGatsby.jpg"
     },

    { id: 4, 
        title: "Sapiens", 
        author: "Yuval Noah Harari", 
        genre: "History", 
        price: "₹1499",
        imgurl:"./Images/sapiens.jpg"
     },

    { id: 5, 
        title: "The Hobbit", 
        author: "J.R.R. Tolkien", 
        genre: "Fantasy", 
        price: "₹1199",
        imgurl:"./Images/theHobbit.jpg"
     },

    { id: 6, 
        title: "Becoming", 
        author: "Michelle Obama", 
        genre: "Biography", 
        price: "₹1599",
        imgurl:"./Images/becoming.jpg"
     },

    { id: 7, 
        title: "Gone Girl", 
        author: "Gillian Flynn", 
        genre: "Mystery", 
        price: "₹849",
        imgurl:"./Images/gonegirl.jpg"
     },
     
    { id: 8, 
        title: "Pride and Prejudice", 
        author: "Jane Austen", 
        genre: "Romance", 
        price: "₹749",
        imgurl:"./Images/pnp.jpg"
     },

    { id: 9, 
        title: "Dracula", 
        author: "Bram Stoker", 
        genre: "Horror", 
        price: "₹1099",
        imgurl:"./Images/dracula.jpg"
     },

    { id: 10, 
        title: "Atomic Habits", 
        author: "James Clear", 
        genre: "Self-Help", 
        price: "₹1299",
        imgurl:"./Images/athab.jpg"
     },

    { id: 11, 
        title: "1984", 
        author: "George Orwell", 
        genre: "Fiction", 
        price: "₹1199",
        imgurl:"./Images/1984.jpeg"
     },

    { id: 12, 
        title: "The Silent Patient", 
        author: "Alex Michaelides", 
        genre: "Mystery", 
        price: "₹899",
        imgurl:"./Images/spat.jpeg"
     }
];

localStorage.setItem("books", JSON.stringify(books));

function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
}

const genreList = document.getElementById("genre-list");
const booksContainer = document.getElementById("books-container");

function displayGenres() {
    genres.forEach(genre => {
        const li = document.createElement("li");
        li.textContent = genre;
        li.addEventListener("click", () => filterBooksByGenre(genre));
        genreList.appendChild(li);
    });
}

function displayBooks(filteredBooks) {
    booksContainer.innerHTML = ""; 

    if (filteredBooks.length === 0) {
        booksContainer.innerHTML = "<p>No books available for this genre.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <img src="${book.imgurl}" alt="${book.title} cover" class="book-image">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <button onclick="borrowBook(${book.id})">Borrow</button>
        `;

        booksContainer.appendChild(bookCard);
    });
}

function filterBooksByGenre(genre) {
    const allBooks = loadBooksFromLocalStorage();
    const filteredBooks = allBooks.filter(book => book.genre === genre);
    displayBooks(filteredBooks);
}

function borrowBook(bookId) {
    const allBooks = loadBooksFromLocalStorage();
    const book = allBooks.find(book => book.id === bookId);
    if (book) {
        const modal = document.getElementById("borrow-modal");
        modal.style.display = "block";

        const borrowMessage = document.getElementById("borrow-message");
        borrowMessage.textContent = `You have borrowed "${book.title}" by ${book.author}.`;
    }
}

function closeModal() {
    const modal = document.getElementById("borrow-modal");
    modal.style.display = "none";
}

document.getElementById("close-modal").addEventListener("click", closeModal);

(() => {
    displayGenres();
    displayBooks(loadBooksFromLocalStorage()); 
})();
