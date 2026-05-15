// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const library = [];

function Book(id, name, autor, pages) {
  if (!new.target) throw Error(`Must use "new" operator`)

  this.id = id;
  this.name = name;
  this.autor = autor;
  this.pages = pages;
}

const addBookToLibrary = (name, autor, pages) => {
  const bookID = crypto.randomUUID();
  const theBook = new Book(bookID, name, autor, pages);

  library.push(theBook);
}
// addBookToLibrary("The Book", "Bookert Bookington", 324);
// addBookToLibrary("King Book", "Robook Hamilbook", 215);

// console.table(library)