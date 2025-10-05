# Contributing to realmeet

Thank you for your interest in contributing to **realmeet**! 🎉 We welcome contributions from everyone, whether you're fixing a bug, adding a feature, improving documentation, or helping with translations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [piyusharyan23@gmail.com](mailto:piyusharyan23@gmail.com).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **Git**

### Fork the Repository

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/realmeet.git
   cd realmeet
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/PiyushAryan/realmeet.git
   ```

## Development Setup

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_SOCKET_URL=http://localhost:3000
   VITE_AI_API_URL=http://localhost:3001
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MISTRAL_PORT=3001
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```

4. Start the Socket.IO server:
   ```bash
   npm start
   ```

5. Start the AI server (optional):
   ```bash
   node ai-server.js
   ```

## How to Contribute

### 🐛 Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/PiyushAryan/realmeet/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node.js version)

### 🚀 Suggesting Features

1. Check existing [Issues](https://github.com/PiyushAryan/realmeet/issues) and [Discussions](https://github.com/PiyushAryan/realmeet/discussions)
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach
   - Mockups or wireframes (if applicable)

### 💻 Code Contributions

1. **Pick an Issue**: Look for issues labeled `good first issue` or `help wanted`
2. **Assign Yourself**: Comment on the issue to let others know you're working on it
3. **Create a Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Make Changes**: Follow our [style guidelines](#style-guidelines)
5. **Test**: Ensure your changes work and don't break existing functionality
6. **Commit**: Use conventional commit messages
7. **Push**: Push your branch to your fork
8. **Pull Request**: Create a PR with a clear description

### 📚 Documentation

- Fix typos or improve existing documentation
- Add examples or tutorials
- Translate documentation
- Improve code comments

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Meaningful commit messages
- [ ] Documentation updated (if applicable)
- [ ] No console logs or debugging code left
- [ ] Responsive design tested (for UI changes)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested on Chrome/Firefox/Safari
- [ ] Tested on mobile devices
- [ ] Tested with multiple users

## Screenshots (if applicable)
<!-- Add screenshots here -->

## Related Issues
Closes #issue_number
```

### Review Process

1. At least one maintainer review is required
2. All CI checks must pass
3. Address any requested changes
4. Once approved, a maintainer will merge your PR

## Style Guidelines

### JavaScript/React

- Use **ES6+** features
- Follow **functional programming** patterns
- Use **React Hooks** over class components
- Prefer **arrow functions** for components
- Use **destructuring** where appropriate

### Code Formatting

- Use **Prettier** for code formatting
- Use **ESLint** for code linting
- **2 spaces** for indentation
- **Semicolons** required
- **Single quotes** for strings

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Follow **mobile-first** responsive design
- Use **semantic class names** when needed
- Group related utilities together

### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Files**: kebab-case (`user-profile.js`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Git Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add real-time cursor tracking
fix: resolve websocket connection issues
docs: update installation instructions
style: format code with prettier
refactor: optimize editor performance
test: add unit tests for user actions
```

## Issue Guidelines

### Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation related
- `performance` - Performance improvements
- `security` - Security related

### Priority Levels

- `high` - Critical bugs or important features
- `medium` - Standard priority
- `low` - Nice to have improvements

## Development Guidelines

### File Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── forms/          # Form components
│   └── Workspace/      # Workspace components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

### Component Guidelines

- Keep components **small and focused**
- Use **custom hooks** for complex logic
- Implement **proper error boundaries**
- Add **PropTypes** or **TypeScript** types
- Include **accessibility** attributes

### Performance

- Use **React.memo** for expensive components
- Implement **code splitting** where appropriate
- Optimize **bundle size**
- Use **lazy loading** for images

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for **new features**
- Include **edge cases**
- Test **user interactions**
- Mock **external dependencies**

## Community

### Getting Help

- **GitHub Issues**: Technical problems
- **GitHub Discussions**: Questions and ideas
- **Discord**: Real-time chat (coming soon)

### Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Special thanks in major releases

## Security

If you discover a security vulnerability, please email [piyusharyan23@gmail.com](mailto:piyusharyan23@gmail.com) instead of opening a public issue.

## License

By contributing to realmeet, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## Quick Links

- [Issues](https://github.com/PiyushAryan/realmeet/issues)
- [Pull Requests](https://github.com/PiyushAryan/realmeet/pulls)
- [Discussions](https://github.com/PiyushAryan/realmeet/discussions)
- [Project Board](https://github.com/PiyushAryan/realmeet/projects)

**Happy Contributing!** 🚀

If you have any questions, feel free to reach out to [@PiyushAryan](https://github.com/PiyushAryan) or open a discussion.