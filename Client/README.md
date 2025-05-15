# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
//?===============================================
//! Website Setup Guide
//?===============================================

?Prerequisites

Ensure you have the following installed:

Node.js (Latest LTS version recommended)

MongoDB (Local or cloud-based like MongoDB Atlas)


Installation Steps

1. Extract the ZIP File

Extract the ZIP file and navigate into the project folder.

cd your-project-folder

2. Install Dependencies

Backend Setup

Navigate to the Server folder and install dependencies:

cd server
npm install

Frontend Setup

Navigate to the client folder and install dependencies:

cd ../client
npm install


3. Run the Project

Start Backend Server

In the client folder, run:

npx nodemon .\server.js

or

(depending on your setup)

Start Frontend Server

In the frontend folder, run:

npm run dev

5. Access the Website

The frontend will run on http://localhost:5173/ (using Vite) 

The backend will run on http://localhost:5000/ (or your configured port).


6. Database Setup

Ensure MongoDB is running locally or provide a cloud database connection string in .env.

If needed, seed initial data using:


node backend/seeder.js

7. Additional Notes

If you face errors, try deleting node_modules and package-lock.json and reinstall:


rm -rf node_modules package-lock.json
npm install

//=======================================================================
