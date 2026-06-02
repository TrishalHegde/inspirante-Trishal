# DECISIONS.md

## Why I chose this stack

When I read the brief, the first thing that stood out was the constraint: *"write your own styles, no CSS frameworks."* That told me this project was more about clean fundamentals than flashy tooling. So I made choices that would keep the code readable and easy to reason about.

**React (Vite)** was an easy pick for the frontend. The app has two distinct user experiences — admin and student — with real-time state (like a registration count updating after you register). React makes managing that kind of conditional UI straightforward. Vite makes the dev experience fast with near-instant hot reload.

**Flask** was my go-to for the backend. I've used Express before, but Flask feels lighter for a project like this — there's no ceremony around setting up routes, the Blueprint system keeps files organized, and it was up and running in minutes. For a REST API that's essentially 4–5 endpoints, Flask is exactly the right size tool.

**MySQL** was the only real database choice once I read "persistent relational data with proper constraint checking." The relationship between users, events, and registrations is inherently relational — a registration belongs to one student and one event. I also used a `UNIQUE` constraint on `(student_id, event_id)` in the registrations table, which means duplicate registrations are impossible at the database level, not just in the application logic. That's a safety net I wanted regardless of what the UI does.

---

## One decision I made that wasn't asked for

I built a centralized `apiFetch` wrapper function in `client/src/api/api.js`.

The brief didn't ask for this — I could have just written `fetch(...)` calls directly in each component. But I knew from experience that doing that leads to a mess quickly. Every component would need to repeat the same `Content-Type: application/json` header, the same `Authorization: Bearer <token>` logic, and the same `response.ok` check.

With `apiFetch`, that's all defined in one place. If the token format ever changes, I change one line. If I want to add global error logging later, I add it once. My components stay clean — they just call `apiFetch('/events')` and handle the result. It's a small decision, but it's the kind of thing that makes a codebase easier to maintain.

---

## One thing I'd improve with more time

**Password hashing.** Right now, passwords are stored in plain text in the database. I'm fully aware this is wrong for a real application — I just made a deliberate call to not let it block me from finishing the actual features, and I'm being honest about it here.

The fix is straightforward: use `bcrypt`. On registration, you'd hash the password before inserting it. On login, you'd use `bcrypt.checkpw(entered_password, stored_hash)` instead of a direct string comparison. Two changes, maybe 10 lines of code total.

I'd also move the JWT token from `sessionStorage` to an `httpOnly` cookie. Currently, any JavaScript running on the page can read the token from `sessionStorage`, which makes it vulnerable to XSS attacks. An `httpOnly` cookie is invisible to JavaScript — the browser sends it automatically with each request, and it can't be stolen by a malicious script. This would require a small change on both the Flask side (set the cookie in the response) and the React side (remove the manual `Authorization` header since the browser handles it).

These are production-grade concerns. For the scope of this assignment, I prioritized getting all the features working correctly and clearly.

---

## Bonus: Going Live (Deployment)

The brief mentioned deployment was a bonus, so I decided to go ahead and put it live. I wanted to make it as easy as possible for the review team to actually test the app without needing to set up MySQL locally. 

I used a 100% free stack to pull this off:
- **Aiven** for hosting the MySQL database
- **Render** for the Flask backend (using Gunicorn for production)
- **Vercel** for the React frontend

It took a bit of extra effort to wire up the environment variables and fix CORS issues between Render and Vercel's dynamic URLs, but it was totally worth it. The app is live and fully functional for anyone with the link!
