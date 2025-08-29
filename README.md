# Spin the Web Book

**Weaving Digital Portals**

A comprehensive LaTeX technical book documenting the **Spin the Web** project -
an framework for building dynamic enterprise web portals using WBDL
(Webbase Definition Language), WBPL (Webbase Programming Language), and the Web
Spinner Engine.

## About This Project

This book provides complete documentation for the Spin the Web ecosystem,
covering everything from foundational concepts to advanced implementation
techniques. The project enables the creation of sophisticated web portals
through declarative configuration and dynamic content management.

**Key Features:**

- **107+ pages** of professional technical documentation
- Modular LaTeX structure for easy maintenance
- Complete coverage of WBDL, WBPL, Web Spinner Engine, and the Spin the Web
  Studio
- Real-world implementation examples and best practices
- Future roadmap and development directions
- NEW: Implementation chapter covering the technology stack and mechanics

## Project Structure

```
├── main.tex                   # Main document file
├── build.sh                   # Build script (bash)
├── SpinTheWeb.pdf             # Generated book
├── preamble/                  # LaTeX configuration
│   ├── packages.tex           # Package imports
│   ├── formatting.tex         # Style definitions
│   └── commands.tex           # Custom commands
├── frontmatter/               # Book front matter
│   ├── titlepage.tex          # Title and copyright pages
│   ├── abstract.tex           # Abstract with project figure
│   └── preface.tex            # Preface with mathematical philosophy
├── part1-foundations/         # Part I: Philosophy (Foundations and Concepts)
│   ├── intro.tex              # Part introduction
│   ├── genesis.tex            # Project history and genesis
│   ├── introduction.tex       # Introduction to enterprise portals
│   ├── virtualized.tex        # Virtualized portal framework
│   └── architecture.tex       # Technical architecture
├── part2-languages/           # Part II: Theory (Languages and Mechanics)
│   ├── intro.tex              # Part introduction
│   ├── wbdl.tex               # Webbase Definition Language
│   ├── wbpl.tex               # Webbase Placeholders Language
│   ├── wbll.tex               # Webbase Layout Language
│   ├── webbaselets.tex        # Webbaselets and components
│   ├── web-spinner-engine.tex # Web Spinner Engine
│   └── studio.tex             # Spin the Web Studio IDE
├── part3-implementation/      # Part III: Practice (Implementation)
│   ├── intro.tex              # Part introduction
│   ├── portal-structure.tex   # Guide to structuring a web portal
│   ├── learning.tex           # Practical insights and methodology
│   └── technology-stack.tex   # Technology stack and implementation mechanics
├── part4-future/              # Part IV: Future (Evolution)
│   ├── intro.tex              # Part introduction
│   └── future-directions.tex  # Roadmap and evolution
├── figures/                   # Images and diagrams
│   ├── logo.png               # Project logo (75x75)
│   └── spin-the-web.png       # Main project architecture diagram
├── bibliography/              # References and citations
└── build/                     # Generated files and PDFs
```

## Implementation Technology (Reference Spinner)

The current reference implementation of the spinner is built with:

- Deno runtime (TypeScript) for server-side mechanics and tasks
- In-memory WBML tree built from `STWSite`, `STWArea`, `STWPage`, `STWContent`
- WBLL layout engine with token handlers generating specialized render functions
- WBPL expression parsing for dynamic values and logic
- Docker multi-stage build for deployment

Source: https://github.com/keyvisions/spintheweb

## Building the Book

### Quick Build (Recommended)

```bash
# Single command build
./build.sh
```

This will:

1. Compile the LaTeX source using pdflatex
2. Generate `SpinTheWeb.pdf` in the root directory
3. Display build status and any warnings

### Using VS Code (Alternative)

1. Open the project in VS Code
2. Open `main.tex`
3. Use **Ctrl+Alt+B** (or **Cmd+Option+B** on macOS) to build
4. Use **Ctrl+Alt+V** (or **Cmd+Option+V** on macOS) to view PDF

### Manual Build Commands

```bash
# Basic build
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

# Copy and rename PDF
cp build/main.pdf SpinTheWeb.pdf
```

## Book Content Overview

### Part I: Philosophy — Foundations and Concepts (Chapters 1–4)

- Chapter 1: Project Genesis — History and evolution of Spin the Web
- Chapter 2: Introduction to Enterprise Portal Challenges — Problem domain
  analysis
- Chapter 3: Virtualized Portal Framework — Conceptual architecture
- Chapter 4: Technical Architecture and Mechanics — System design principles

### Part II: Theory — Languages and Mechanics (Chapters 5–10)

- Chapter 5: WBDL (Webbase Definition Language) — Declarative markup language
- Chapter 6: WBPL (Webbase Placeholder Language) — Placeholder managment
- Chapter 7: WBLL (Webbase Layout Language) — Component layout management
- Chapter 8: Webbase and Webbaselets
- Chapter 9: Web Spinner Engine Architecture and Mechanics
- Chapter 10: Spin the Web Studio: An Integrated Development Environment

### Part III: Practice — Implementation (Chapters 11–13)

- Chapter 11: Structuring a Web Portal: A Practical Guide
- Chapter 12: Learning from Implementation — Practical insights and methodology
- Chapter 13: Technology Stack and Implementation Mechanics — Deno/TypeScript
  runtime, WBLL engine, WBPL, session/state, security, and deployment

### Part IV: Future (Chapter 14)

- Chapter 14: Future Directions — Roadmap, evolution, and next steps

## Development Status

✅ Project status: Active and content-expanding

- New implementation chapter added to bridge theory and practice
