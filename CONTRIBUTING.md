# Contributing to Django + Svelte Template

Thank you for your interest in contributing to this template! We welcome contributions from the community.

## 🚀 Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/hingslim/django-svelte-template.git
   cd django-svelte-template
   ```
3. **Set up the development environment**:
   ```bash
   npm run setup
   npm run migrate
   npm run createsuperuser
   ```

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run dev        # Test the application
   npm run test       # Run backend tests
   npm run lint       # Check code quality
   npm run format     # Format code
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

### Python/Django
- Follow [PEP 8](https://pep8.org/) style guide
- Use **Black** for code formatting (`npm run format:backend`)
- Use **isort** for import sorting
- Write docstrings for functions and classes
- Add type hints where appropriate

### JavaScript/TypeScript
- Use **Prettier** for code formatting (`npm run format:frontend`)
- Follow **ESLint** rules (`npm run lint:frontend`)
- Use TypeScript for type safety
- Write JSDoc comments for complex functions

### Svelte
- Follow Svelte best practices
- Use proper component structure
- Implement accessibility features
- Test components thoroughly

## 🧪 Testing

### Backend Tests
```bash
npm run test:backend
```

### Frontend Tests
We welcome contributions to add frontend testing:
- Unit tests with Vitest
- Component tests with Testing Library
- E2E tests with Playwright

## 📚 Documentation

When contributing, please:
- Update relevant documentation
- Add comments for complex logic
- Update the README if adding new features
- Consider updating the ARCHITECTURE.md guide

## 🐛 Bug Reports

When reporting bugs, please include:
- Operating system and version
- Python version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

## 💡 Feature Requests

For feature requests:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🏷️ Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add password reset functionality
fix(api): handle empty todo list response
docs: update installation instructions
style: format code with prettier
```

## 🔄 Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - References related issues
   - Includes tests if applicable
   - Updates documentation if needed

2. **PR will be reviewed** for:
   - Code quality and style
   - Functionality and testing
   - Documentation completeness
   - Breaking changes

3. **Address review feedback** promptly

4. **Squash commits** if requested before merging

## 🌟 Recognition

Contributors will be:
- Added to the contributor list
- Mentioned in release notes
- Credited in documentation

## 📞 Getting Help

- **Questions?** Open a GitHub Discussion
- **Issues?** Create a GitHub Issue
- **Chat?** Check if we have a Discord/Slack

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make this template better! 🎉 