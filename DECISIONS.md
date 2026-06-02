# Decisions

## Stack Choice
I chose to use **React (Vite) + Flask + MySQL**. React is excellent for building dynamic, single-page applications efficiently. Flask is lightweight and very un-opinionated, making it incredibly fast to set up for a simple REST API. MySQL was chosen to strictly fulfill the requirement of persistent relational data storage with proper constraint checking.

## One Unspecified Decision
I decided to handle the API requests through a centralized wrapper function (`apiFetch` in `api.js`). This wasn't explicitly requested, but it ensures that the `Content-Type` and `Authorization` headers are consistently attached to every single request. It also centralizes the `response.ok` error checking, which means my React components are much cleaner and don't need repetitive try-catch boilerplate for response parsing.

## One Thing to Improve
If I had more time, I would implement **password hashing using bcrypt**. Currently, the passwords in the `users` table are stored in plain text, which is an unacceptable security risk for a production environment. I would update the registration flow to hash passwords before storing them, and update the login endpoint to use `bcrypt.checkpw()` instead of a direct string comparison. Additionally, the JWT token is currently stored in memory/session storage; moving it to a secure `httpOnly` cookie would protect it from XSS attacks.
