// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const libraryContainer = document.getElementById("library-container");
const newBookCard = document.getElementById("new-book-card");
// const newBookDialog = document.getElementById("new-book-dialog");
const addBookBtn = document.getElementById("add-book-btn");

const library = [];
const defaultCover = "./assets/images/default-cover.jpg";

function Book(title, author, pages, cover) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.cover = cover;
}

const addBookToLibrary = (title, author, pages, cover = defaultCover) => {
  const book = new Book(title, author, pages, cover);

  library.push(book);
};

const createNewBook = () => {
  addBookBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    addBookToLibrary(title, author, pages);
    createBookCard(title, defaultCover);
  });
}

const createBookCard = (title, cover) => {
  const bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", "book-container");

  const bookCover = document.createElement("div");
  bookCover.setAttribute("class", "book-cover");

  const coverImage = document.createElement("img");
  coverImage.setAttribute("src", cover);
  coverImage.setAttribute("alt", "book cover image");
  coverImage.setAttribute("height", "180");
  coverImage.setAttribute("width", "120");

  const bookTitle = document.createElement("div");
  bookTitle.setAttribute("class", "book-title");
  bookTitle.textContent = title;

  bookCover.appendChild(coverImage);
  bookContainer.appendChild(bookCover);
  bookContainer.appendChild(bookTitle);
  libraryContainer.insertBefore(bookContainer, newBookCard);
};

const showBookCards = () => {
  for(let book of library) {
    createBookCard(book.title, book.cover)
  }
};

const addExampleBooks = () => {
  addBookToLibrary("Of Mice and Men", "John Steinback", 107, "./assets/images/of-mice-and-men-cover.jpg");
  addBookToLibrary("The Call of the Wild", "Jack London", 172, "./assets/images/the-call-of-the-wild-cover.jpg");
  addBookToLibrary("1984", "George Orwell", 298, "./assets/images/1984-cover.jpg");
  addBookToLibrary("White Fang", "Jack London", 252, "./assets/images/white-fang-cover.jpg");
  addBookToLibrary("Michael Strogoff", "Jules Verne", 349, "./assets/images/michael-strogoff-cover.jpg");
};

// newBookCard.addEventListener("click", () => newBookDialog.showModal());
addExampleBooks();
createNewBook();
showBookCards();