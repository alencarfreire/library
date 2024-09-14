// dados
const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }
}

const addBook = document.getElementById("addBook");
const addNewBook = document.querySelector("#new-book");
const dialog = document.querySelector("#new-book-dialog");
const close = document.querySelector(".close");
const allBooks = document.querySelector(".all-books");

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const readRadios = document.getElementsByName("read");

  if (
    title === "" ||
    author === "" ||
    pages === "" ||
    (!readRadios[0].checked && !readRadios[1].checked)
  )
    return false;

  const read = readRadios[0].checked;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  displayBook(book);
  clearForm();
  openDialog();
}

function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.getElementsByName("read")[0].checked = false;
  document.getElementsByName("read")[1].checked = false;
}

function displayBook(book) {
  const newItem = document.createElement("div");
  newItem.innerHTML = `
    <p>Livro - ${myLibrary.length}</p>
    <div class="this-book">
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read? ${book.read ? "yes" : "no"}</p>
    </div>
  `;
  allBooks.appendChild(newItem);
}

function openDialog() {
  dialog.toggleAttribute("open");
}

addBook.addEventListener("click", addBookToLibrary);
addNewBook.addEventListener("click", openDialog);
close.addEventListener("click", openDialog);

// Para debugging
function displayBookLogs() {
  myLibrary.forEach((book) => {
    console.log(book.info());
  });
}

addBook.addEventListener("click", displayBookLogs);
