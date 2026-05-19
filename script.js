// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const bookCardContainer = document.querySelector("#book-cards-container");

const library = [];

function Book(title, autor, pages, cover) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = autor;
  this.pages = pages;
  this.cover = cover;
}

const addBookToLibrary = (title, autor, pages, cover) => {
  const book = new Book(title, autor, pages, cover);

  library.push(book);
};

const addExampleBooks = () => {
  addBookToLibrary("Of Mice and Men", "John Steinback", 107, "of-mice-and-men-cover.jpg");
  addBookToLibrary("The Call of the Wild", "Jack London", 172);
  addBookToLibrary("1984", "George Orwell", 298);
  addBookToLibrary("White Fang", "Jack London", 252);
  addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", 409);
};

const createBookCard = (title, cover) => {
  const bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", "book-container")

  const bookCover = document.createElement("div");
  bookCover.setAttribute("class", "book-cover")

  const coverImage = document.createElement("img");
  coverImage.setAttribute("src", assignCover(cover));
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

const assignCover = (cover) => {
  if (!cover) {
    return "./assets/images/default-cover.jpg";
  } else {
    return `./assets/images/${cover}`;
  }
}

const showBookCards = () => {
  for(let book of library) {
    createBookCard(book.title, book.cover)
  }
};

addExampleBooks();
showBookCards();