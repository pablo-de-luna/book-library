// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const libraryContainer = document.querySelector("#library-container");

const createBookCard = (title) => {
  const bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", "book-container")

  const bookCover = document.createElement("div");
  bookCover.setAttribute("class", "book-cover")

  const coverImage = document.createElement("img");
  // If there is no image, display solid color cover with title name text
  coverImage.setAttribute("src", "./assets/images/of-mice-and-men-cover.jpg");
  coverImage.setAttribute("alt", "book cover image");
  coverImage.setAttribute("height", "180");
  coverImage.setAttribute("width", "120");

  const bookTitle = document.createElement("div");
  bookTitle.setAttribute("class", "book-title")
  bookTitle.textContent = title;

  bookCover.appendChild(coverImage)
  bookContainer.appendChild(bookCover)
  bookContainer.appendChild(bookTitle)
  libraryContainer.appendChild(bookContainer);
};

const library = [];

function Book(title, autor, pages) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = autor;
  this.pages = pages;
}

const addBookToLibrary = (title, autor, pages) => {
  const book = new Book(title, autor, pages);

  library.push(book);
};

const addExampleBooks = () => {
  addBookToLibrary("Of Mice and Men", "John Steinback", 107);
  addBookToLibrary("The Call of the Wild", "Jack London", 172);
  addBookToLibrary("1984", "George Orwell", 298);
  addBookToLibrary("White Fang", "Jack London", 252);
  addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", 409);
};

addExampleBooks();

for(let book of library) {
  createBookCard(book.title)
};

console.log(library);