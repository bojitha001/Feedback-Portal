# Simple Feedback Portal

A minimal full-stack web app to collect user feedback. This take-home exercise is designed to assess your understanding of core full-stack development concepts.

## Tech Stack

- Frontend: React + Axios + React Router
- Backend: Node.js + Express + Prisma
- Database: SQLite (via Prisma)

## Features

- User Registration & Login (JWT-based Auth)
- Submit feedback
- View submitted feedback
- [Bonus] Admin Dashboard to view all feedback across users

## Folder Structure

```
simple-feedback-portal/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── feedback.js
│   │   └── admin.js       # (Bonus)
│   ├── middleware/
│   │   └── auth.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SubmitFeedback.jsx
│   │   │   ├── MyFeedback.jsx
│   │   │   └── AdminDashboard.jsx  # (Bonus)
```

## Getting Started

### 1. Clone the repo
```bash
git clone <repo-url>
cd simple-feedback-portal
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
JWT_SECRET=your_secret_key
```

Initialize the database:
```bash
npx prisma migrate dev --name init
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Tasks

### Core Tasks
- [ ] Implement user registration and login using JWT.
- [ ] Create a form to submit feedback.
- [ ] Create a page to view your own feedback.

### Bonus Task (Optional)
- [ ] Add an admin dashboard (`/admin`) that lists all feedbacks with user emails.
- [ ] Only users with `isAdmin: true` in the database can access this dashboard.

## Notes

- Protect all API routes using JWT.
- Use `Authorization: Bearer <token>` in frontend requests after login.
- Tokens are stored in `localStorage` (feel free to improve this!).

## Tips

- You can use any libraries or tools (e.g. Tailwind, React Query, AI tools).
- Focus on clear structure, clean code, and basic functionality.
- Bonus points for meaningful commits and structure.

## Evaluation Criteria

- Code readability and organization
- Understanding of authentication, state, and routing
- Ability to connect frontend and backend cleanly
- Optional bonus work and UX polish

## Submission

Please submit:
- A zip of the complete project OR a public GitHub link
- A brief note (in the repo or email) if you did anything extra
