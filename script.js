let myLibrary = [];

function Book(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

const dialog = document.getElementById('add-book-dialog');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('add-book-form');

openBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const author = formData.get('author');
    const title = formData.get('title');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'read';

    addBookToLibrary(author, title, pages, read);

    dialog.close();

    form.reset();

    DisplayBooks();
})

function addBookToLibrary(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
}

function removeBookFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    DisplayBooks();
}

function DisplayBooks() {
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Unread'}</p>
            <button class="remove-book-btn" onclick="removeBookFromLibrary('${book.id}')">Remove</button>
        `;
        bookList.appendChild(bookCard);
    })
}

DisplayBooks();