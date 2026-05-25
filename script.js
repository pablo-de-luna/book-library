// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const libraryContainer = document.getElementById("library-container");
const newBookCard = document.getElementById("new-book-card");
const newBookDialog = document.getElementById("new-book-dialog");
const bookInfoDialog = document.getElementById("book-info-dialog");
const addBookBtn = document.getElementById("add-book-btn");
const deleteBtn = document.getElementById("delete-book");
const readStatusBtn = document.getElementById("read-status-btn");

const defaultCover = "./assets/images/default-cover.jpg";
const library = [];

let bookCards;

function Book(title, author, pages, cover, readStatus) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.cover = cover;
  this.readStatus = readStatus;
}

Book.prototype.toggleStatus = function() {
  (!this.readStatus) ? this.readStatus = true : this.readStatus = false;
};

const handleReadStatusButton = () => {
  readStatusBtn.addEventListener("click", () => {
    library.forEach(bookObj => {
      if (bookObj.id === bookInfoDialog.dataset.id) {
        bookObj.toggleStatus();
        return;
      }
    });
  });
};

const setReadStatusTag = () => {
  const statusTags = document.querySelectorAll(".status-tag");

  statusTags.forEach(tag => {
    const status = library.find(book => (book.id === tag.parentElement.dataset.id)).readStatus;

    if (status) {
      tag.className = "read-status-tag"
    }
  });
}

const addExampleBooks = () => {
  exampleBooks.forEach(book => {
    addBookToLibrary(
      book.title,
      book.author,
      book.pages,
      book.cover,
      book.readStatus,
    );
  });
};

const addBookToLibrary = (title, author, pages, cover = defaultCover, readStatus) => {
  const book = new Book(title, author, pages, cover, readStatus);

  library.push(book);
};

const createNewBook = () => {
  addBookBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const cover = document.getElementById("cover").files[0];
    let bookId;

    addBookToLibrary(title, author, pages);
    
    bookId = library.at(-1).id;
    createBookCard(title, cover, bookId);
    document.getElementById("new-book-form").reset();
    newBookDialog.close();
    updateAndShowInfoDialog();
    setBookCover();
  });
}
    
const setBookCover = (coverImage, cover) => {
  if (typeof cover === "string") {
    coverImage.setAttribute("src", cover);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    coverImage.setAttribute("src", reader.result);
    library.at(-1).cover = reader.result;
  });

  if (cover) reader.readAsDataURL(cover);
};

const createBookCard = (title, cover = defaultCover, bookId) => {
  const bookContainer = document.createElement("div");
  const bookCover = document.createElement("div");
  const bookTitle = document.createElement("div");
  const coverImage = document.createElement("img");
  const statusTag = document.createElement("span");

  setBookCover(coverImage, cover);

  bookContainer.className = "book-container";
  bookContainer.setAttribute("data-id", bookId)
  bookCover.className = "book-cover";
  bookTitle.className = "book-title";
  coverImage.setAttribute("alt", "book cover image");
  coverImage.setAttribute("height", "180");
  coverImage.setAttribute("width", "120");
  statusTag.className = "status-tag";

  bookTitle.textContent = title;

  bookContainer.appendChild(statusTag);
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
      bookInfoDialog.setAttribute("data-id", bookObj.id)

      bookInfoDialog.showModal();
    });
  });
};

const deleteBookWithBtn = () => {
  deleteBtn.addEventListener("click", () => {
    const bookCards = document.querySelectorAll(".book-container");

    for (let i = 0; i < library.length; i++) {
      if (library[i].id === bookInfoDialog.dataset.id) {
        library.splice(i, 1);
        
        bookCards.forEach(bookElem => {
          if (bookElem.dataset.id === bookInfoDialog.dataset.id) {
            bookElem.remove();
          }
        });

        bookInfoDialog.close();
        break;
      }
    }
  });
};

const showNewBookDialog = () => {
  newBookCard.addEventListener("click", () => newBookDialog.showModal());
};

const closeDialog = () => {
  const closeDialogButtons = document.querySelectorAll(".close-dialog-btn");

  closeDialogButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.close();
    });
  })
}

const initializeLibrary = () => {
  addExampleBooks();
  showNewBookDialog();
  closeDialog();
  createNewBook();
  showBookCards();
  updateAndShowInfoDialog();
  deleteBookWithBtn();
  handleReadStatusButton();
  setReadStatusTag();
};

initializeLibrary();