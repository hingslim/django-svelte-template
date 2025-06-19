# Django + Svelte Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Django](https://img.shields.io/badge/django-5.2+-green.svg)](https://www.djangoproject.com/)
[![Svelte](https://img.shields.io/badge/svelte-5.0+-orange.svg)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A modern, production-ready full-stack template combining Django REST Framework with SvelteKit, featuring authentication, CRUD operations, dark mode, and a complete todo application demo.

**🚀 [Live Demo](https://github.com/hingslim/django-svelte-template)** | **📖 [Documentation](./ARCHITECTURE.md)**

> 📖 **[Read the Architecture Guide](ARCHITECTURE.md)** for a detailed technical overview of the codebase

## Features

### 🚀 Core Stack
- **Django 5.2.3** with REST Framework
- **Svelte 5** with SvelteKit and TypeScript support
- **Tailwind CSS** with Typography plugin for styling
- **Axios** for API communication with CSRF handling

### 🔒 Security & Authentication
- **Session-based authentication** with secure defaults
- **CSRF protection** properly configured
- **CORS** configured for development and production
- **Security headers** for production deployments

### 🎨 UI/UX Features
- **Dark mode** support with system preference detection
- **Responsive design** with mobile-first approach
- **Loading states** and **error handling**
- **Animated transitions** and micro-interactions
- **Celebration animations** for todo completion

### 🛠️ Developer Experience
- **Hot reload** for both frontend and backend
- **TypeScript** support with strict configuration
- **ESLint & Prettier** for code formatting
- **Black & isort** for Python code formatting
- **Pre-commit hooks** for automated code quality
- **VS Code** workspace configuration included

### 🐳 Deployment & DevOps
- **Docker** support with multiple compose files
- **SQLite** default with **PostgreSQL** option
- **Production-ready** security configurations
- **Static file** handling and optimization
- **Environment-based** configuration management

### 📱 Demo Application
- **Complete Todo App** with CRUD operations
- **Priority levels** and **due dates**
- **Categories** and **tags** support
- **Real-time updates** and **optimistic UI**

## Quick Start

### Prerequisites

- Python 3.10+ (3.12 recommended)
- Node.js 18+
- npm or yarn
- Virtual environment (recommended)

### Setup

1. **Clone and install dependencies:**
   ```bash
   npm run setup
   ```
   
   This will:
   - Install frontend dependencies
   - Create Python virtual environment with Python 3.12 (`django_svelte_env/`)
   - Install Django 5.2.3 and other Python dependencies in the virtual environment
   
   *On Windows, if Python command fails, try:*
   ```bash
   npm run install
   npm run setup:python-win
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run database migrations:**
   ```bash
   npm run migrate
   ```
   
   *On Windows:*
   ```bash
   npm run migrate:win
   ```

4. **Create a superuser:**
   ```bash
   npm run createsuperuser
   ```
   
   *On Windows:*
   ```bash
   npm run createsuperuser:win
   ```

5. **Start development servers:**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

## Development

### Available Scripts

**Development:**
- `npm run dev` - Start both frontend and backend development servers
- `npm run dev:backend` - Start only Django development server
- `npm run dev:frontend` - Start only SvelteKit development server
- `npm run setup` - Install all dependencies
- `npm run setup:dev` - Install all dependencies including development tools

**Database:**
- `npm run migrate` - Run Django migrations
- `npm run createsuperuser` - Create Django superuser

**Building & Deployment:**
- `npm run build` - Build frontend for production
- `npm run collectstatic` - Collect static files

**Code Quality:**
- `npm run lint` - Lint both frontend and backend code
- `npm run lint:frontend` - Lint frontend code with ESLint
- `npm run lint:backend` - Lint backend code with flake8
- `npm run format` - Format both frontend and backend code
- `npm run format:frontend` - Format frontend code with Prettier
- `npm run format:backend` - Format backend code with Black and isort

**Testing:**
- `npm run test` - Run backend tests
- `npm run test:backend` - Run Django tests

**Windows-specific (if python3 command fails):**
- `npm run setup:python-win` - Install Python dependencies on Windows
- `npm run migrate:win` - Run Django migrations on Windows
- `npm run createsuperuser:win` - Create Django superuser on Windows
- `npm run collectstatic:win` - Collect static files on Windows

### Docker Development

**SQLite (Default):**
```bash
docker-compose up
```

**PostgreSQL:**
```bash
docker-compose -f docker-compose.postgres.yml up
```

**Production:**
```bash
docker-compose -f docker-compose.prod.yml up
```

## Project Structure

```
django-svelte-template/
├── backend/                 # Django application
│   ├── django_svelte_template/
│   │   ├── settings.py     # Django settings
│   │   ├── urls.py         # URL configuration
│   │   └── api/            # API application
│   │       ├── models.py   # Data models
│   │       ├── views.py    # API views
│   │       ├── serializers.py
│   │       └── urls.py
│   ├── templates/          # Django templates
│   └── manage.py
├── frontend/               # SvelteKit application
│   ├── src/
│   │   ├── routes/         # SvelteKit routes
│   │   ├── lib/
│   │   │   ├── components/ # Svelte components
│   │   │   ├── api.ts      # API client
│   │   │   └── stores.ts   # Svelte stores
│   │   └── app.css
│   ├── package.json
│   └── vite.config.js
├── django_svelte_env/      # Python virtual environment
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
├── docker-compose.yml     # Docker configuration
├── README.md              # Setup and usage guide
└── ARCHITECTURE.md        # Technical documentation
```

## API Endpoints

### Authentication
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout
- `GET /api/user/` - Get current user info
- `GET /api/csrf/` - Get CSRF token

### Todos
- `GET /api/todos/` - List todos
- `POST /api/todos/` - Create todo
- `GET /api/todos/{id}/` - Get todo detail
- `PATCH /api/todos/{id}/` - Update todo
- `DELETE /api/todos/{id}/` - Delete todo

## Production Deployment

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Collect static files:**
   ```bash
   npm run collectstatic
   ```

3. **Set environment variables:**
   - Set `DEBUG=False`
   - Configure proper `SECRET_KEY`
   - Set `ALLOWED_HOSTS`

4. **Use a production WSGI server like Gunicorn:**
   ```bash
   pip install gunicorn
   gunicorn django_svelte_template.wsgi:application
   ```

## Troubleshooting

### Common Issues

**Python command not found:**
- On macOS/Linux: Use `python3` instead of `python`
- On Windows: Use `python` or ensure Python is in your PATH
- Try the Windows-specific scripts (`:win` suffix)

**npm vulnerabilities or dependency conflicts:**
```bash
npm run clean-install
# OR manually:
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**CORS issues:**
- Ensure frontend is running on http://localhost:5173
- Check Django CORS_ALLOWED_ORIGINS in settings.py

**Database issues:**
```bash
# Reset database
rm backend/db.sqlite3
npm run migrate
npm run createsuperuser
```

**Static files not loading:**
```bash
npm run build
npm run collectstatic
```

**Manual virtual environment activation:**
```bash
# Activate virtual environment manually (if needed)
source django_svelte_env/bin/activate  # macOS/Linux
# OR
django_svelte_env\Scripts\activate     # Windows

# Your prompt should show: (django_svelte_env) $
```

## Contributing

1. Fork the repository
2. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** to understand the codebase structure
3. Create a feature branch
4. Make your changes
5. Run tests and ensure code quality
6. Submit a pull request

## License

MIT License - see LICENSE file for details.