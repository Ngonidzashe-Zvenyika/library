// These are the initialized global variables;
const form = document.querySelector("form");
const formButtons = document.querySelectorAll("button");
const overlay = document.getElementById("overlay");
let myLibrary = [];

// This is the book object constructor;
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

// This function displays the form pop-up and blurs the background;
function displayForm() {
    form.style.display = "block";
    overlay.style.display = "block";

    overlay.addEventListener("click", ()=> {
        form.style.display = "none";
        overlay.style.display = "none";
    })
}

// This function validates the form fields, prevents the form from submitting to the url, and calls removeForm() and displayBooks();
function submitForm(event) {
    let filled = true;
    let title = "";
    let author = "";
    let pages = "";
    let readStatus = document.querySelector("#read-status").value;

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        switch (true) {
            case (input.name === "title"):
                title = input.value;
                break;
            case (input.name === "author"):
                author = input.value;
                break;
            case (input.name === "pages"):
                pages = input.value;
        }
        if (input.value === "") {
            filled = false;
        }
    })
    if (filled === false) return;

    event.preventDefault();
    let book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    removeForm();
    displayBooks();
}

// This function clears the form and removes it from the display;
function removeForm() {
    form.reset();
    form.style.display = "none";
    overlay.style.display = "none";
}

// This function iterates through the myLibrary array and displays each object on a card, it calls toggleReadStatus() and removeBook();
function displayBooks() {
    const bookList = document.querySelector(".book-list");
    bookList.replaceChildren();

    myLibrary.forEach((book, index) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        let title = document.createElement("h3");
        title.innerText = book.title;
        bookCard.appendChild(title);

        let author = document.createElement("p");
        author.innerText = book.author;
        bookCard.appendChild(author);

        let pages = document.createElement("p");
        pages.classList.add("pages");
        pages.innerText = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);

        let toggleReadStatusButton = document.createElement("button");
        toggleReadStatusButton.classList.add("toggle-status");
        toggleReadStatusButton.innerText = book.readStatus;
        toggleReadStatusButton["index"] = index;

        let removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book");
        removeBookButton.innerText = "Remove";
        removeBookButton["index"] = index;

        let buttonContainer = document.createElement("p");
        buttonContainer.appendChild(toggleReadStatusButton);
        buttonContainer.appendChild(removeBookButton);
        bookCard.appendChild(buttonContainer);

        bookList.appendChild(bookCard);
    });

    toggleReadStatus();
    removeBook();
}

// This function adds an event listener to a button on each card that will change the read-status, it calls setButtonColor();
function toggleReadStatus() {
    let buttons = document.querySelectorAll(".toggle-status");
    for (const button of buttons) {
        setButtonColor(button);
        button.addEventListener("click", ()=> {
            if (button.innerText === "Not Read") {
                button.innerText = "Reading";
            } else if (button.innerText === "Reading") {
                button.innerText = "Read";
            } else button.innerText = "Not Read";
            setButtonColor(button);

            myLibrary[button.index].readStatus = button.innerText;
        })
    }
}

// This function indicates the read-status by setting the background color of the relevant button;
function setButtonColor(button) {
    if (button.innerText === "Read") {
        button.style.backgroundColor = "hsl(90, 100%, 80%)";
    } else if (button.innerText === "Reading") {
        button.style.backgroundColor = "hsl(30, 100%, 80%)";
    } else button.style.backgroundColor = "hsl(0, 100%, 80%)";
}

// This function adds an event listener to a button on each card that will remove the book from the myLibrary array and update the display by calling displayBooks();
function removeBook() {
    let buttons = document.querySelectorAll(".remove-book");
    for (const button of buttons) {
        button.addEventListener("click", ()=> {
            myLibrary.splice(button.index, 1);
            displayBooks();
        })
    }
}


// Main Program - includes event listeners that allow one to utilize the form to add books to list.
for (const button of formButtons) {
    button.addEventListener("click", (event)=> {
        switch(true) {
            case (button.classList.contains("display-form")):
                displayForm();
                break;
            case (button.classList.contains("submit-form")):
                submitForm(event);
        }
    })
}



