# BookWorm

An application created by a book lover (aka a bookworm), so that all book lovers can keep track of their private libraries in a fun and easy manner.
It was created using the MERN stack: React for the FrontEnd, Node.js & Express.js for the BackEnd and MongoDB for the database.

The user can enter book information manually or use the integrated ISBN scanner to get the information automatically. He then can update the information or remove the entry entirely.

The app uses the [Google Books API](https://developers.google.com/books) to get the book information whenever the user scans a book's ISBN code.

[**DEMO**](https://bookworm-137r.onrender.com/)

## Installation
To get the project on your computer follow the following steps:

1. Fork the project's repository to your Github account
2. Clone the repository from your Github account to your local hard drive `git clone [url]`
3. Open a command prompt and go to the project's root folder
4. Type `cd server` to enter the BackEnd folder
5. Type `npm install` to install the package dependencies for the BackEnd
6. Type `cd ..` to return to the root folder
7. Type `cd client` to enter the FrontEnd folder
8. Type `npm install` to install the package dependencies for the FrontEnd

Environmental requirements: 
Create a .env file and fill in the following properties with your preferences.
    VITE_API_KEY (your key for the Google Books API)
    PORT
    MONGO_URI
    JWT_SECRET

9. Cd back to the server folder and type `npm start` to run the server
10. Cd back to the client folder and type `npm run dev`
11. Press ctrl and click on the link in the terminal to open the application on the browser
12. 
