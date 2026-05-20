// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const bookCardContainer = document.querySelector("#book-cards-container");
const newBookButton = document.querySelector("#new-book-card");
const newBookDialog = document.querySelector("#new-book-dialog");

const library = [];
const defaultCover = "./assets/images/default-cover.jpg";

function Book(title, autor, pages, cover = defaultCover) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = autor;
  this.pages = pages;
  this.cover = cover;
}

// CREATE FUNCTION TO ADD NEW BOOK WITH NEW BOOK CARD
const showDialog = () => {
  newBookButton.addEventListener("click", () => newBookDialog.showModal())
};
showDialog();

const addBookToLibrary = (title, autor, pages, cover) => {
  const book = new Book(title, autor, pages, cover);

  library.push(book);
};

const createBookCard = (title, cover) => {
  const bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", "book-container")

  const bookCover = document.createElement("div");
  bookCover.setAttribute("class", "book-cover")

  const coverImage = document.createElement("img");
  coverImage.setAttribute("src", cover);
  coverImage.setAttribute("alt", "book cover image");
  coverImage.setAttribute("height", "180");
  coverImage.setAttribute("width", "120");

  const bookTitle = document.createElement("div");
  bookTitle.setAttribute("class", "book-title")
  bookTitle.textContent = title;

  bookCover.appendChild(coverImage)
  bookContainer.appendChild(bookCover)
  bookContainer.appendChild(bookTitle)
  bookCardContainer.appendChild(bookContainer);
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

addExampleBooks();
showBookCards();