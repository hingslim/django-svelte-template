# 📊 Django-Svelte Codebase Overview

## 🏗️ **Architecture Overview**

This is a **full-stack web application** that combines Django (backend) with Svelte 5 (frontend) to create a modern todo application with authentication.

```
┌─────────────────┐    HTTP/JSON    ┌──────────────────┐    ORM    ┌──────────┐
│   Svelte 5      │ ◄──────────────► │   Django 5.2.3   │ ◄────────► │ SQLite   │
│   Frontend      │                 │   REST API       │           │ Database │
└─────────────────┘                 └──────────────────┘           └──────────┘
```

## 📁 **Project Structure**

```
django-svelte/
├── 🐍 backend/                    # Django Backend
│   ├── manage.py                  # Django CLI tool
│   ├── db.sqlite3                 # Database file
│   ├── api/                       # Todo API app
│   │   ├── models.py              # Todo data model
│   │   ├── views.py               # API endpoints
│   │   ├── serializers.py         # JSON conversion
│   │   └── urls.py                # API routes
│   ├── django_svelte_template/    # Main Django project
│   │   ├── settings.py            # Configuration
│   │   └── urls.py                # URL routing
│   └── templates/                 # HTML templates
├── 🎨 frontend/                   # Svelte Frontend
│   ├── src/
│   │   ├── routes/                # SvelteKit pages
│   │   │   ├── +layout.svelte     # Global layout
│   │   │   └── +page.svelte       # Main page
│   │   ├── lib/
│   │   │   ├── components/        # UI components
│   │   │   ├── stores.ts          # State management
│   │   │   └── api.ts             # API client
│   │   └── app.css                # Global styles
│   ├── package.json               # Dependencies
│   └── vite.config.js             # Build config
├── 🐳 docker-compose.yml          # Docker setup
├── 📋 requirements.txt            # Python deps
├── 📦 package.json                # Project scripts
└── 🔒 django_svelte_env/          # Virtual environment
```

## 🔄 **Data Flow**

### **User Authentication Flow**
```
1. User visits landing page (LandingPage.svelte)
2. Clicks "Get Started" → LoginModal.svelte appears
3. Login credentials sent to Django /api/login/
4. Django validates & creates session
5. Frontend receives user data & CSRF token
6. TodoApp.svelte loads user's todos
```

### **Todo CRUD Operations**
```
Create: TodoForm → POST /api/todos/ → Database
Read:   TodoApp → GET /api/todos/ → Display list
Update: TodoItem → PATCH /api/todos/{id}/ → Update UI
Delete: TodoItem → DELETE /api/todos/{id}/ → Remove from UI
```

## 🧩 **Key Components**

### **Backend (Django)**

**🏠 Main Project (`django_svelte_template/`)**
- `settings.py`: Database, CORS, static files, REST framework config
- `urls.py`: Routes API calls to the `api` app

**📡 API App (`api/`)**
- `models.py`: 
  ```python
  class Todo(models.Model):
      title = CharField(max_length=200)
      description = TextField(blank=True)
      completed = BooleanField(default=False)
      user = ForeignKey(User, on_delete=CASCADE)
      created_at = DateTimeField(auto_now_add=True)
  ```

- `views.py`: REST API endpoints
  ```python
  # Authentication endpoints
  def login_view(request)         # POST /api/login/
  def logout_view(request)        # POST /api/logout/
  def get_csrf_token(request)     # GET /api/csrf/
  
  # Todo CRUD
  class TodoViewSet(ModelViewSet)  # /api/todos/
  ```

- `serializers.py`: JSON ↔ Python object conversion
- `urls.py`: API route definitions

### **Frontend (Svelte 5)**

**📄 Pages (`routes/`)**
- `+layout.svelte`: Global layout wrapper
- `+page.svelte`: Main page logic (landing vs app)

**🎨 Components (`lib/components/`)**
- `LandingPage.svelte`: Marketing page with animations
- `LoginModal.svelte`: Full-screen animated login form
- `Header.svelte`: Navigation with user info & logout
- `TodoApp.svelte`: Main todo application container
- `TodoForm.svelte`: Add new todo form
- `TodoItem.svelte`: Individual todo with edit/delete

**🗄️ State Management (`lib/`)**
- `stores.ts`: Svelte stores for global state
  ```typescript
  export const user = writable<User | null>(null);
  export const todos = writable<Todo[]>([]);
  export const showLogin = writable(false);
  ```

- `api.ts`: HTTP client with CSRF token handling
  ```typescript
  export const authApi = { login, logout, getUserInfo };
  export const todoApi = { getTodos, createTodo, updateTodo, deleteTodo };
  ```

## 🔐 **Security Features**

### **Authentication & Authorization**
- **Session-based auth**: Login creates server-side session
- **User isolation**: Each user only sees their own todos
- **CSRF protection**: Tokens prevent cross-site attacks
- **CORS configured**: Frontend/backend communication secured

### **API Security**
```python
# All todo operations require authentication
class TodoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)
```

## 🎯 **Key Features**

### **Modern UI/UX**
- **Responsive design** with Tailwind CSS
- **Smooth animations** using Svelte transitions
- **Real-time updates** without page refreshes
- **Loading states** and error handling

### **Development Experience**
- **Hot reload** for both frontend and backend
- **TypeScript** support for better development
- **Virtual environment** for Python dependency isolation
- **Concurrent development** servers via npm scripts

### **Production Ready**
- **Build optimization** with Vite
- **Static file handling** for deployment
- **Docker support** for containerized deployment
- **Environment configuration** via .env files

## 🔧 **Technology Stack Details**

### **Backend Stack**
- **Django 5.2.3 LTS**: Web framework with ORM
- **Django REST Framework**: API creation
- **django-cors-headers**: Cross-origin requests
- **SQLite**: File-based database (easy for development)

### **Frontend Stack**
- **Svelte 5**: Reactive UI framework with runes
- **SvelteKit**: Full-stack framework with routing
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client with interceptors

### **Development Tools**
- **Concurrently**: Run multiple servers
- **Virtual Environment**: Python dependency isolation
- **Hot Module Replacement**: Instant updates during development

## 🚀 **Common Operations**

### **Development Workflow**
```bash
npm run dev          # Start both servers
npm run migrate      # Apply database changes
npm run createsuperuser  # Create admin user
```

### **API Endpoints**
```
Authentication:
POST   /api/login/     # User login
POST   /api/logout/    # User logout
GET    /api/csrf/      # Get CSRF token
GET    /api/user/      # Get current user

Todos:
GET    /api/todos/     # List user's todos
POST   /api/todos/     # Create new todo
GET    /api/todos/{id}/    # Get specific todo
PATCH  /api/todos/{id}/    # Update todo
DELETE /api/todos/{id}/    # Delete todo
```

## 🔄 **Request/Response Examples**

### **Authentication**
```javascript
// Login
POST /api/login/
{
  "username": "admin",
  "password": "password123"
}

Response:
{
  "detail": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### **Todo Operations**
```javascript
// Create Todo
POST /api/todos/
{
  "title": "Learn Svelte",
  "description": "Complete the tutorial"
}

Response:
{
  "id": 1,
  "title": "Learn Svelte",
  "description": "Complete the tutorial",
  "completed": false,
  "created_at": "2024-06-13T12:00:00Z",
  "user": { "id": 1, "username": "admin" }
}
```

## 🎨 **UI Component Hierarchy**

```
+page.svelte (Main Router)
├── LandingPage.svelte (Unauthenticated)
│   └── LoginModal.svelte (Overlay)
└── Authenticated App
    ├── Header.svelte (Navigation)
    └── TodoApp.svelte (Main Content)
        ├── TodoForm.svelte (Add New)
        └── TodoItem.svelte[] (Todo List)
```

## 🔄 **State Management Flow**

```typescript
// Global Stores (Svelte)
user: User | null           // Current authenticated user
todos: Todo[]              // User's todo list
showLogin: boolean         // Login modal visibility
loading: boolean           // API loading state
error: string | null       // Error messages

// Store Updates
login() → user.set(userData) → TodoApp loads
logout() → user.set(null) → Return to landing
createTodo() → todos.update(add new) → UI updates
```

This codebase demonstrates **modern full-stack development** with clean separation of concerns, proper authentication, and a great developer experience! 🎉