# Todo — Full-Stack Roadmap

This repository currently contains a small static Todo frontend. The file-based app provides a minimal but useful UX; the long-term goal is to evolve it into a full-stack web app with user accounts, persistent server storage and an API.

**Current (present) functionality**
- Add a todo item via the form input and submit button/Enter.
- Mark a todo as completed by clicking the item (toggles completed state).
- Edit an existing todo by right-clicking the item (fills the input for editing).
- Delete a todo by double-clicking the item.
- Persistence using `localStorage` so todos survive page reloads.

Files in this folder:
- `index.html` — static frontend entry
- `todo.js` — frontend logic (handles add/edit/delete/toggle + localStorage)
- `todo.css` — styles

**Goal**: Convert to a production-ready full-stack app (React + Node/Express + DB), add authentication, and deploy.


--
Updated README to document present functionality and next steps.

