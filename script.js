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

function toggleReadStatus(bookId) {
    const book = myLibrary.find(b => b.id === bookId);
    if (book) {
        book.read = !book.read;
        DisplayBooks();
    }
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
            <div class="toggle-read-container">
                <button class="toggle-read-btn" onclick="toggleReadStatus('${book.id}')"> ${book.read ? 'Read' : 'Unread'}</button>
            </div>
            <div class="remove-book-container">
                <svg class="remove-book-btn" onclick="removeBookFromLibrary('${book.id}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
            </div>
        `;
        bookList.appendChild(bookCard);
    })
}

DisplayBooks();