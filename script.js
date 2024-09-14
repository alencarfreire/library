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

  toggleRead() {
    this.read = !this.read;
  }
}

const addBook = document.getElementById("addBook");
const addNewBook = document.querySelector("#new-book");
const dialog = document.querySelector("#new-book-dialog");
const close = document.querySelector(".close");
const allBooks = document.querySelector(".all-books");

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readRadios = document.getElementsByName("read");

  if (
    title === "" ||
    author === "" ||
    pages === "" ||
    (!readRadios[0].checked && !readRadios[1].checked)
  ) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  const read = readRadios[0].checked;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  updateDisplay();
  clearForm();
  openDialog();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  const readRadios = document.getElementsByName("read");
  readRadios[0].checked = false;
  readRadios[1].checked = false;
}

function displayBook(book, index) {
  const newItem = document.createElement("div");
  newItem.dataset.index = index;
  newItem.innerHTML = `
    <div class="head">
      <p>Livro - ${index + 1}</p>
      <button class="delete-book" data-index="${index}">X</button>
    </div>
    <div class="this-book">
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p class="changeRead">Read? <span class="read-status" data-index="${index}">
        ${book.read ? "yes" : "no"}
      </span>
      </p>
    </div>
  `;
  allBooks.appendChild(newItem);

  const deleteButton = newItem.querySelector(".delete-book");
  deleteButton.addEventListener("click", (e) =>
    deleteBook(e.target.dataset.index)
  );

  const readStatus = newItem.querySelector(".read-status");
  readStatus.addEventListener("click", (e) =>
    toggleReadStatus(e.target.dataset.index)
  );
}

function deleteBook(index) {
  if (confirm("Tem certeza que deseja deletar este livro?")) {
    myLibrary.splice(index, 1);
    updateDisplay();
  }
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  updateDisplay();
}

function updateDisplay() {
  allBooks.innerHTML = "";
  myLibrary.forEach((book, index) => {
    displayBook(book, index);
  });
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

// Inicializa a exibição
updateDisplay();

// Garantir que o DOM está carregado antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();
});
