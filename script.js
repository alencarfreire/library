// dados

const myLibrary = [];
let i = 0;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
console.log(theHobbit.info()); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

let addBook = document.getElementById("addBook");
let title = document.querySelector("#title").value;
let author = document.querySelector("#author").value;
let pages = document.querySelector("#pages").value;
let readRadios = document.getElementsByName("read");

function addBookToLibrary() {
  let read;

  if (
    title === "" ||
    author === "" ||
    pages === "" ||
    (!readRadios[0].checked && !readRadios[1].checked)
  )
    return false;

  if (readRadios[0].checked) {
    read = "yes";
  } else {
    read = "no";
  }

  let book = new Book(title, author, pages, read);
  myLibrary[i] = book;
  i++;

  addBook.addEventListener("click", displayBookLogs);
}

addBook.addEventListener("click", addBookToLibrary);

function displayBookLogs() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
}

console.log(myLibrary);

// interface
const addNewBook = document.querySelector("#new-book");
const dialog = document.querySelector("#new-book-dialog");
const close = document.querySelector(".close");
const allBooks = document.querySelector(".all-books");

console.log(addNewBook);
console.log(dialog);
console.log(close);
function openDialog() {
  dialog.toggleAttribute("open");
}

addNewBook.addEventListener("click", openDialog);
close.addEventListener("click", () => {
  dialog.toggleAttribute("open");
});

function displayBook() {
  let newItem = document.createElement("div");

  for (let i = 0; i < myLibrary.length; i++) {
    newItem.innerHTML = `
    <p>Livro - ${myLibrary.length}</p>
    <div class="this-book">
    <p>Title: ${title}</p>
    <p>Author: ${author}</p>
    <p>Pages: ${pages}</p>
    <p>Read? ${readRadios[0].checked ? "yes" : "no"}<p>
    </div>
    `;
  }
  allBooks.appendChild(newItem);
}

addBook.addEventListener("click", displayBook);
