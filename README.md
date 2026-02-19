# 📚 Book Management Application

A simple full-stack web application to manage books using Angular (frontend) and ASP.NET Core Web API (backend).

Users can:
- Add books
- View books
- Update books
- Delete books

---

## 🛠️ Technologies Used

**Frontend**
- Angular (Standalone)
- TypeScript
- HTML & CSS
- HttpClient

**Backend**
- ASP.NET Core (.NET 8)
- C#
- RESTful API
- Swagger

**Storage**
- In-memory list (no database)

---

## 📂 Project Structure

### Backend
```
book-management-backend/
├── Controllers/BooksController.cs
├── Models/Book.cs
├── Data/BookStore.cs
└── Program.cs
```

### Frontend
```
book-management-frontend/
└── src/app/
    ├── models/book.model.ts
    ├── services/book.service.ts
    └── components/book-manager/
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| GET | /api/books/{id} | Get book by ID |
| POST | /api/books | Add book |
| PUT | /api/books/{id} | Update book |
| DELETE | /api/books/{id} | Delete book |

Swagger:
```
http://localhost:5093/swagger
```

---

## 🚀 How to Run

### 1️⃣ Start Backend

```bash
cd book-management-backend
dotnet run
```

Backend runs on:
```
http://localhost:5093
```

---

### 2️⃣ Start Frontend

```bash
cd book-management-frontend
ng serve
```

Frontend runs on:
```
http://localhost:4200
```

---

## 🔄 Application Flow

1. Angular UI sends HTTP request.
2. ASP.NET API processes request.
3. In-memory list updates.
4. Updated data is returned to UI.

---

## 📌 Notes

- Data is stored in memory.
- Data resets when backend restarts.
- CORS configured for `http://localhost:4200`.

---

## ✅ Assignment Requirements Completed

✔ Angular frontend with CRUD UI  
✔ ASP.NET Core REST API  
✔ In-memory data storage  
✔ Frontend–backend integration  

---

Developed as part of Trainee Software Engineer Assignment.