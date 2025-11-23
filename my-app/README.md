# Damilsoft

React + TypeScript application with Material UI, i18n, authentication, and custom business logic.

## Features

- Fast Vite-powered development
- Modular React components
- Material UI design system
- Internationalization (i18n) with `react-i18next`
- Authentication and user context
- API integration and custom hooks
- ESLint, Prettier, and TypeScript for code quality

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
(sudo) npm install
```

### Scripts

| Script | Description | (add sudo in the beggining of the script for macOS)
| `npm run dev` | Start the Vite development server with hot module reload.  
| `npm run build` | Build the app for production (outputs to `dist/`).  
| `npm run preview` | Preview the production build locally.  
| `npm run lint` | Run ESLint on all files in the project.  
| `npm run update-translations` | Extract translation keys from code and update translation files using i18next-parser.
| `npm run validate` | Run ESLint on all source files and fail if there are any warnings.  
| `npm run check_libraries` | Check for unused dependencies in the project using depcheck.

### Project Structure

```
my-app/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── pages/        # App pages
│   ├── API/          # API calls
│   ├── Global/       # Global styles, types, utils
│   ├── Layout/       # App layout and navigation
│   ├── locales/      # i18n translation files
│   └── main.tsx      # App entry point
├── vite.config.js    # Vite configuration
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

## Internationalization (i18n)

- All user-facing text is wrapped with `t("...")` for translation.
- Translation files are in `src/locales/` (e.g. `src/locales/en/translation.json`).
- To add a new language, create a folder in `locales/` and add a `translation.json`.

## Authentication

- User context and authentication logic is in `src/context/AuthContext.tsx`.

## Customization

- Update theme colors in `src/Global/Styles/font.ts` and `src/Global/Styles/theme.ts`.
- Add new pages in `src/pages/` and register routes in `src/Layout/Router/AppRouter.tsx`.

## License

MIT
