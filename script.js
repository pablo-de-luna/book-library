// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const libraryContainer = document.getElementById("library-container");
const newBookCard = document.getElementById("new-book-card");
const newBookDialog = document.getElementById("new-book-dialog");
const BookInfoDialog = document.getElementById("book-info-dialog");
const addBookBtn = document.getElementById("add-book-btn");

const defaultCover = "./assets/images/default-cover.jpg";
const library = [];

let bookCards;

function Book(title, author, pages, cover) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.cover = cover;
}

const addExampleBooks = () => {
  exampleBooks.forEach(({ title, author, pages, cover }) => {
    addBookToLibrary(title, author, pages, cover);
  });
};


const addBookToLibrary = (title, author, pages, cover = defaultCover) => {
  const book = new Book(title, author, pages, cover);

  library.push(book);
};

const createNewBook = () => {
  addBookBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const cover = document.getElementById("cover").files[0];

    addBookToLibrary(title, author, pages);

    const bookId = library.at(-1).id;

    createBookCard(title, cover, bookId);
    newBookDialog.close();
    updateAndShowInfoDialog();
  });
}
    
const createBookCard = (title, cover = defaultCover, bookId) => {
  const bookContainer = document.createElement("div");
  bookContainer.setAttribute("class", "book-container");
  bookContainer.setAttribute("data-id", bookId)

  const bookCover = document.createElement("div");
  bookCover.setAttribute("class", "book-cover");

  const coverImage = document.createElement("img");
  if (typeof cover == "string") {
    coverImage.setAttribute("src", cover);
  } else {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      coverImage.src = reader.result;
      library.at(-1).cover = reader.result;
    });
    
    if (cover) reader.readAsDataURL(cover);
  }
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
    createBookCard(book.title, book.cover, book.id)
  }
};

const updateAndShowInfoDialog = () => {
  const bookCards = document.querySelectorAll(".book-container");

  bookCards.forEach(bookElem => {
    bookElem.addEventListener("click", () => {
      const bookObj = library.find(obj => obj.id === bookElem.dataset.id);

      document.getElementById("info-title").textContent = bookObj.title;
      document.getElementById("info-author").textContent = bookObj.author;
      document.getElementById("info-pages").textContent = bookObj.pages;
      document.getElementById("info-cover").setAttribute("src", bookObj.cover);

      BookInfoDialog.showModal();
    });
  });
};

const initializeLibrary = () => {
  newBookCard.addEventListener("click", () => newBookDialog.showModal());
  addExampleBooks();
  createNewBook();
  showBookCards();
  updateAndShowInfoDialog();
};

initializeLibrary();