# Kresus Technical Test - Frontend

## Tech Stack

- **Main Framework:** [Vue 3](https://vuejs.org/)
- **Language:** TypeScript
- **Bundler:** [Vite](https://vitejs.dev/)
- **UI:** [shadcn-vue](https://www.shadcn-vue.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/arthurmougin/kresus-technical-test.git
cd kresus-technical-test/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

- `src/components/`: Reusable Vue components
  - `src/components/todos`: Application-specific components related to todos
  - `src/components/ui`: shadcn-generated components
- `src/store/`: State management (Pinia)
- `src/lib/`: Utilities
- `src/views/`: Individual views
- `src/App.vue`: Root component
- `src/router.ts`: Routing configuration (including guards)

## Contributing

1. **Fork** the project and clone your fork.
2. **Create a branch** for your feature or fix:

   ```bash
   git checkout -b my-feature
   ```

3. **Develop** your changes following the project's structure and conventions.
4. **Test** locally (`npm run dev`).
5. **Commit** your changes:

   ```bash
   git add .
   git commit -m "Add my feature"
   git push origin my-feature
   ```

6. **Open a Pull Request** on the main repository.

### Best Practices

- Use TypeScript for all components.
- Prefer the composition API.
- Document your components and functions.
- Ensure visual consistency with existing UI components.
- Add tests if possible.

## Support

For questions or suggestions, open an issue on GitHub.

---
