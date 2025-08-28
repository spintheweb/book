# Spin the Web Book

**Weaving Digital Portals**

A comprehensive LaTeX technical book documenting the **Spin the Web** project - an innovative framework for building dynamic enterprise web portals using WBDL (Web Base Definition Language), WBPL (Web Base Programming Language), and the Web Spinner Engine.

## About This Project

This book provides complete documentation for the Spin the Web ecosystem, covering everything from foundational concepts to advanced implementation techniques. The project enables the creation of sophisticated web portals through declarative configuration and dynamic content management.

**Key Features:**
- **107+ pages** of professional technical documentation
- Modular LaTeX structure for easy maintenance
- Complete coverage of WBDL, WBPL, and Web Spinner Engine
- Real-world implementation examples and best practices
- Future roadmap and development directions
- NEW: Implementation chapter covering the technology stack and mechanics

## Project Structure

```
├── main.tex                    # Main document file
├── build.sh                    # Build script (bash)
├── SpinTheWeb.pdf              # Generated book
├── stwp.md                     # Original markdown source
├── preamble/                   # LaTeX configuration
│   ├── packages.tex           # Package imports
│   ├── formatting.tex         # Style definitions
│   └── commands.tex           # Custom commands
├── frontmatter/               # Book front matter
│   ├── titlepage.tex          # Title and copyright pages
│   ├── abstract.tex           # Abstract with project figure
│   └── preface.tex            # Preface with mathematical philosophy
├── part1-foundations/         # Part I: Philosophy (Foundations and Concepts)
│   ├── part1.tex             # Part introduction
│   ├── chapter01-genesis.tex  # Project history and genesis
│   ├── chapter02-intro.tex    # Introduction to enterprise portals
│   ├── chapter03-virtualized.tex # Virtualized portal framework
│   └── chapter04-architecture.tex # Technical architecture
├── part2-languages/           # Part II: Theory (Languages and Mechanics)
│   ├── part2.tex             # Part introduction
│   ├── chapter05-wbdl.tex     # Web Base Definition Language
│   ├── chapter06-wbpl.tex     # Web Base Programming Language
│   ├── chapter07-webbaselets.tex # Webbaselets and components
│   └── chapter08-web-spinner-engine.tex # Web Spinner Engine
├── part3-implementation/      # Part III: Practice (Implementation)
│   ├── part3.tex             # Part introduction
│   ├── chapter09-learning.tex # Practical insights and methodology
│   └── chapter10-technology-stack.tex # Technology stack and implementation mechanics
├── part4-future/              # Part IV: Future (Evolution)
│   ├── part4.tex             # Part introduction
│   └── chapter10-future-directions.tex # Roadmap and evolution
├── figures/                   # Images and diagrams
│   ├── logo.png              # Project logo (75x75)
│   └── spin-the-web.png      # Main project architecture diagram
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
- Chapter 2: Introduction to Enterprise Portal Challenges — Problem domain analysis
- Chapter 3: Virtualized Portal Framework — Conceptual architecture
- Chapter 4: Technical Architecture and Mechanics — System design principles

### Part II: Theory — Languages and Mechanics (Chapters 5–8)
- Chapter 5: WBDL (Web Base Definition Language) — Declarative markup language
- Chapter 6: WBPL (Web Base Programming Language) — Procedural scripting language
- Chapter 7: Webbaselets — Component-based architecture
- Chapter 8: Web Spinner Engine — Core processing engine and mechanics

### Part III: Practice — Implementation (Chapters 9–10)
- Chapter 9: Learning from Implementation — Practical insights and methodology
- Chapter 10: Technology Stack and Implementation Mechanics — Deno/TypeScript runtime, WBLL engine, WBPL, session/state, security, and deployment

### Part IV: Future (Evolution)
- Chapter 10: Future Directions — Roadmap, evolution, and next steps

## Development Status

✅ Project status: Active and content-expanding
- New implementation chapter added to bridge theory and practice
