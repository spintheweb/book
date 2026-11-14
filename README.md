# Spin the Web Book

**Weaving Web Portals**

[![Creative Commons License](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

[**Read the latest PDF**](https://spintheweb.github.io/book/SpinTheWeb.pdf)

The book follows a four-part progression: philosophy and foundations, the
technical framework, portal implementation, and expansion into a network of
portals. It details the Webbase Ontology Language (WBOL), the Web Spinner, and
Spin the Web Studio, and guides readers in using them to build web portals. The
framework and this book are stewarded by the eponymous open-source **Spin the
Web Project**.

## Book Content

### Part I: The Foundations — Philosophy (Chapters 1–4)

- Chapter 1: Genesis and History — History and evolution of Spin the Web
- Chapter 2: Introduction to Enterprise Portal Challenges — Problem domain
  analysis
- Chapter 3: Web Portals as Virtualized Enterprises — Concept and rationale
- Chapter 4: Architecture Overview — System design principles

### Part II: The Framework — Technical Foundations (Chapters 5–11)

- Chapter 5: WBOL (Webbase Ontology Language) — Declarative language
- Chapter 6: WBPL (Webbase Placeholders Language) — Placeholder management
- Chapter 7: WBLL (Webbase Layout Language) — Component layout management
- Chapter 8: Webbase and Webbaselets
- Chapter 9: Web Spinner Runtime Architecture and Mechanics
- Chapter 10: Spin the Web Studio: An Integrated Development Environment
- Chapter 11: Technology Stack and Implementation Mechanics — Node.js/JavaScript
  runtime, WBLL layout interpreter, WBPL, session/state, security, and
  deployment

### Part III: The Portal — Implementation (Chapters 12–14)

- Chapter 12: Enterprise — Purpose, processes, structure, communication, and
  the portal's role as the enterprise channel
- Chapter 13: Implementing Portal Contents — Structure, semantics, information
  architecture, documentation, search, and evolution
- Chapter 14: Implementing Portal Visuals — Layout, navigation systems,
  interaction, accessibility, theming, and performance

### Part IV: A Network of Portals — Expansion (Chapter 15)

- Chapter 15: Interconnected Portals

### Appendices

- Appendix A: WBOL XML Schema Reference — Formal XML Schema (XSD) definitions for
  WBOL element types (webbase, area, page, content, etc.)
- Appendix B: WBLL Token Reference — Complete reference for WBLL tokens, syntax,
  examples, and interpreter behavior
- Appendix C: Webbaselets: BPMS, PLM, and Ticketing — Overview and common design
  for three foundational webbaselets; includes structured classification and
  examples

## Book Structure

```
├── main.tex                   # Main document file
├── build.sh                   # Build script (bash)
├── SpinTheWeb.pdf             # Generated book
├── preamble/                  # LaTeX configuration
│   ├── packages.tex           # Package imports
│   ├── formatting.tex         # Style definitions
│   ├── glossary.tex           # Glossary and acronyms
│   └── commands.tex           # Custom commands
├── frontmatter/               # Book front matter
│   ├── titlepage.tex          # Title and copyright pages
│   ├── license.tex            # License page
│   ├── dedication.tex         # Dedication page
│   ├── abstract.tex           # Abstract
│   └── preface.tex            # Preface with mathematical philosophy
├── part1-foundations/         # Part I: The Foundations
│   ├── intro.tex              # Part introduction
│   ├── genesis.tex            # History and genesis
│   ├── introduction.tex       # Introduction to enterprise portals
│   ├── virtualized.tex        # Virtualized portal framework
│   └── architecture.tex       # Technical architecture
├── part2-framework/           # Part II: Framework Specification and Mechanics
│   ├── intro.tex              # Part introduction
│   ├── wbol.tex               # Webbase Ontology Language (WBOL)
│   ├── wbpl.tex               # Webbase Placeholders Language (WBPL)
│   ├── wbll.tex               # Webbase Layout Language (WBLL)
│   ├── webbaselets.tex        # Webbaselets and components
│   ├── web-spinner.tex        # The Web Spinner Runtime
│   ├── studio.tex             # The Spin the Web Studio
│   └── technology.tex         # Technology stack of the reference implementation
├── part3-portal/              # Part III: The Portal
│   ├── intro.tex              # Part introduction
│   ├── enterprise.tex         # Enterprise purpose, processes, and communication
│   ├── contents.tex           # Implementing portal contents (structure, semantics, IA)
│   └── visuals.tex            # Implementing portal visuals (layout, interaction, branding)
├── part4-network/             # Part IV: A Network of Portals
│   ├── intro.tex              # Part introduction
│   └── directions.tex         # Interconnected portals and expansion
├── figures/                   # Images and diagrams
│   ├── logo.png               # Logo
│   └── spin-the-web.png       # Architecture diagram
├── bibliography/              # References and citations
│   └── references.bib
├── appendices/                # Appendices
│   ├── wbol-json-schema.tex   # WBOL JSON Schema reference
│   ├── wbll-tokens.tex        # WBLL token reference
│   └── webbaselets.tex        # Webbaselets appendix
└── build/                     # Generated files (auto-generated, can be safely cleaned)
```

## Building the Book

### Install LaTeX (pdflatex)

You need a LaTeX toolchain that provides `pdflatex`, `bibtex`, `makeindex`, and
`makeglossaries` (or `makeglossaries-lite`).

- Linux
  - Full TeX Live:
    ```bash
    sudo apt update
    sudo apt install -y texlive-full makeglossaries
    ```
  - Minimal sets vary by distro; ensure `pdflatex`, `bibtex`, `makeindex`,
    `makeglossaries` are available.

Verify installation:

```bash
pdflatex --version
bibtex --version
makeindex --version
makeglossaries --version || makeglossaries-lite --version
```

### Linux (bash)

```bash
./build.sh
```

This will:

1. Compile the LaTeX source using pdflatex
2. Run bibtex, makeindex, and makeglossaries
3. Generate `SpinTheWeb.pdf` in the root directory
4. Display build status and any warnings
