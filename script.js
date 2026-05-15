// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

const library = [];

function Book(name, autor, pages) {
  this.name = name;
  this.autor = autor;
  this.pages = pages;
}

const addBookToLibrary = (name, autor, pages) => {
  const book = new Book(name, autor, pages);

  library.push(book);
}

addBookToLibrary("book name", "autor name", 324);
addBookToLibrary("book2 name", "autor2", 215);

console.log(library)