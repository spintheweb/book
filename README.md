![status: work in progress](https://img.shields.io/badge/status-WIP-yellow)

# Spin the Web Book

**Weaving Web Portals**

[**Read the latest PDF**](https://spintheweb.github.io/book/SpinTheWeb.pdf)

This book presents the Spin the Web framework, from foundational concepts to implementation techniques. The content details the Webbase Description Language (WBDL), the Web Spinner, and Spin the Web Studio, and then provides a guide on how to use it to build web portals. The framework and this book are stewarded by the eponymous open-source **Spin the Web Foundation**.

## Book Content

### Part I: The Foundations (Chapters 1–4)

- Chapter 1: Genesis and History — History and evolution of Spin the Web
- Chapter 2: Introduction to Enterprise Portal Challenges — Problem domain analysis
- Chapter 3: Web Portals as Virtualized Enterprises — Concept and rationale
- Chapter 4: Architecture Overview — System design principles

### Part II: The Framework (Chapters 5–11)

- Chapter 5: WBDL (Webbase Description Language) — Declarative language
- Chapter 6: WBPL (Webbase Placeholders Language) — Placeholder management
- Chapter 7: WBLL (Webbase Layout Language) — Component layout management
- Chapter 8: Webbase and Webbaselets
- Chapter 9: Web Spinner Runtime Architecture and Mechanics
- Chapter 10: Spin the Web Studio: An Integrated Development Environment
- Chapter 11: Technology Stack and Implementation Mechanics — Deno/TypeScript runtime, WBLL layout interpreter, WBPL, session/state, security, and deployment

### Part III: The Portal (Chapters 12–13)

- Chapter 12: Implementing Portal Contents — Structure, semantics, information architecture, documentation, search, and evolution
- Chapter 13: Implementing Portal Visuals — Layout, navigation systems, interaction, accessibility, theming, and performance

### Part IV: The Roadmap (Chapter 14)

- Chapter 14: The Roadmap

### Appendices

- Appendix A: WBDL JSON Schema Reference — Formal JSON Schema definitions for WBDL element types (Site, Area, Page, Content, etc.)
- Appendix B: WBLL Token Reference — Complete reference for WBLL tokens, syntax, examples, and interpreter behavior
- Appendix C: Webbaselets: BPMS, PLM, and Ticketing — Overview and common design for three foundational webbaselets; includes structured classification and examples

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
│   ├── wbdl.tex               # Webbase Description Language (WBDL)
│   ├── wbpl.tex               # Webbase Placeholders Language (WBPL)
│   ├── wbll.tex               # Webbase Layout Language (WBLL)
│   ├── webbaselets.tex        # Webbaselets and components
│   ├── web-spinner.tex        # The Web Spinner Runtime
│   ├── studio.tex             # The Spin the Web Studio
│   └── technology.tex         # Technology stack of the reference implementation
├── part3-implementation/      # Part III: Implementation (Contents & Visuals)
│   ├── intro.tex              # Part introduction
│   ├── contents.tex           # Implementing portal contents (structure, semantics, IA)
│   └── visuals.tex            # Implementing portal visuals (layout, interaction, branding)
├── part4-roadmap/             # Part IV: The Roadmap
│   ├── intro.tex              # Part introduction
│   └── directions.tex         # Roadmap and evolution
├── figures/                   # Images and diagrams
│   ├── logo.png               # Logo
│   └── spin-the-web.png       # Architecture diagram
├── bibliography/              # References and citations
│   └── references.bib
├── appendices/                # Appendices
│   ├── wbdl-json-schema.tex   # WBDL JSON Schema reference
│   ├── wbll-tokens.tex        # WBLL token reference
│   └── webbaselets.tex        # Webbaselets appendix
└── build/                     # Generated files (auto-generated, can be safely cleaned)
```

## Building the Book

```bash
./build.sh
```

This will:

1. Compile the LaTeX source using pdflatex
2. Generate `SpinTheWeb.pdf` in the root directory
3. Display build status and any warnings
