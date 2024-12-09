# 🔒 Next Login with JWT and Bcrypt Password

Welcome to **Next Login with JWT and Bcrypt Password**, a secure and scalable authentication system built with modern technologies. This project uses **React**, **Next.js**, **TailwindCSS**, **Prisma**, **JWT**, and **Bcrypt** for secure password handling.

---

## 📚 Table of Contents

- [🔒 Next Login with JWT and Bcrypt Password](#-next-login-with-jwt-and-bcrypt-password)
  - [📚 Table of Contents](#-table-of-contents)
  - [⚙️ Technologies](#️-technologies)
  - [🚀 Getting Started](#-getting-started)
  - [⚡ Environment Variables](#-environment-variables)
  - [🛠️ Project Structure](#️-project-structure)
  - [📜 License](#-license)

---

## ⚙️ Technologies

This project is built using the following technologies:

- 🌐 ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - A JavaScript library for building user interfaces.
- ⚡ ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) - A React framework for server-rendered web applications.
- 🎨 ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) - A utility-first CSS framework for rapid UI development.
- 🛠️ ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) - An ORM for database manipulation.
- 🔒 ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) - Secure JSON Web Token-based authentication.
- 🔑 ![Bcrypt](https://img.shields.io/badge/Bcrypt-228B22?style=for-the-badge&logo=security&logoColor=white) - For hashing and securely storing passwords.

---

## 🚀 Getting Started

To set up and run the project locally:

1. Clone the repository to your local machine.
2. Install the necessary dependencies `npm i`.
3. Set up the environment variables (see [Environment Variables](#-environment-variables)).
4. Run database migrations `npx prisma migrate dev`.
5. Start the development server.
6. Open your browser and navigate to `http://localhost:3000`.

---

## ⚡ Environment Variables

The project requires the following environment variables to function properly. Create a `.env` file in the root of the project and add:

DATABASE_URL=your-database-url  
JWT_SECRET=your-jwt-secret

```env
- **`DATABASE_URL`**: Connection string for your database.
- **`JWT_SECRET`**: Secret key for JWT authentication.
```

---

## 🛠️ Project Structure

```plaintext
├── /app       # Next.js pages
├── /components  # Reusable UI components
├── /styles      # Global and TailwindCSS styles
├── /prisma      # Prisma schema and migrations
├── /lib       # Utility functions
├── /app/api         # API routes for authentication
└── /middleware  # Middleware for JWT validation
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
Feel free to use and modify it as per your needs!

---

🎉 **Happy Coding!** 🚀
