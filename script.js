// biblioteca de livros
const myLibrary = [];

// construtor do objeto livro
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  // info para debugar
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }
}

// selecionando elementos html
const newBook = document.querySelector("#new-book");
const dialog = document.querySelector("#new-book-dialog");
const addBook = document.querySelector("#addBook");
const close = document.querySelector(".close");
const allBooks = document.querySelector(".all-books");

//função para adicionar os novos livros a array myLibrary
function addBookToLibrary() {
  // selecionando os valores do form do dialog
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const readRadios = document.getElementsByName("read");

  // se nao digitar nda, retornar false
  if (
    title === "" ||
    author === "" ||
    pages === "" ||
    (!readRadios[0].checked && !readRadios[1].checked)
  )
    return false;

  // se marcar o [0] que é o yes, retornar true(checked)
  const read = readRadios[0].checked;
  // criar o novo book
  const book = new Book(title, author, pages, read);
  // adicionar o novo book na array myLibrary
  myLibrary.push(book);

  displayBooks(book);
}

// criar o evento para capturar o clique ao botão e retornar a função addBookToLibrary
addBook.addEventListener("click", addBookToLibrary);

// função para adicionar ou retirar o atributo 'open' do dialog
function openDialog() {
  dialog.toggleAttribute("open");
}
// ao clicar no botão 'new book' abre o dialog
newBook.addEventListener("click", openDialog);

function displayBooks(book) {
  let newItem = document.createElement("div");
  newItem.innerHTML = `
    <p>Livro - ${myLibrary.length}</p>
    <div class="this-book">
      <div class="data-book">
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read? ${book.title ? "yes" : "no"}</p>
      </div>
    </div>
  `;
  allBooks.appendChild(newItem);
}



// debugging
function displayBookLogs() {
  myLibrary.forEach((book) => {
    console.log(book.info());
  });
}
// add o novo livro ao console.log
addBook.addEventListener("click", displayBookLogs);
