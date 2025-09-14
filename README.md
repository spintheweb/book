![status: work in progress](https://img.shields.io/badge/status-WIP-yellow)

# Spin the Web Book

**Weaving Web Portals**

[**Read the Latest PDF Version (Local)**](SpinTheWeb.pdf) |
[**View the Live Site**](https://spintheweb.github.io/book/)

This book documents Spin the Web, from foundational concepts to implementation techniques. The content first details the framework — WBDL, Web Spinner, and Spin the Web Studio — and then provides a guide on how to use it to build web portals.

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
├── part1-foundations/         # Part I: Foundations and Concepts
│   ├── intro.tex              # Part introduction
│   ├── genesis.tex            # History and genesis
│   ├── introduction.tex       # Introduction to enterprise portals
│   ├── virtualized.tex        # Virtualized portal framework
│   └── architecture.tex       # Technical architecture
├── part2-framework-mechanics/ # Part II: The Platform: Framework Specification and Mechanics
│   ├── intro.tex              # Part introduction
│   ├── wbdl.tex               # Webbase Definition Language (WBDL)
│   ├── wbpl.tex               # Webbase Placeholders Language (WBPL)
│   ├── wbll.tex               # Webbase Layout Language (WBLL)
│   ├── webbaselets.tex        # Webbaselets and components
│   ├── web-spinner-engine.tex # The Web Spinner Engine
│   ├── studio.tex             # The Spin the Web Studio
│   └── technology-stack.tex   # Technology stack of the reference implementation
├── part3-implementation/      # Part III: The Practice: Building a Web Portal
│   ├── intro.tex              # Part introduction
│   ├── portal-structure.tex   # Guide to structuring a web portal
│   └── learning.tex           # The portal development journey
├── part4-future/              # Part IV: Future Directions
│   ├── intro.tex              # Part introduction
│   └── future-directions.tex  # Roadmap and evolution
├── figures/                   # Images and diagrams
│   ├── logo.png               # Logo
│   └── spin-the-web.png       # Architecture diagram
├── bibliography/              # References and citations
│   └── references.bib
├── appendices/                # Appendices
│   ├── wbll-tokens.tex        # WBLL token reference
│   └── webbaselets.tex        # Webbaselets appendix
└── build/                     # Generated files (auto-generated, can be safely cleaned)
```

## Implementation Technology

See [https://github.com/spintheweb](https://github.com/spintheweb)

## Building the Book

```bash
./build.sh
```

This will:

1. Compile the LaTeX source using pdflatex
2. Generate `SpinTheWeb.pdf` in the root directory
3. Display build status and any warnings

## Book Content Overview

### Part I: The Philosophy (Chapters 1–4)

- Chapter 1: Genesis — History and evolution of Spin the Web
- Chapter 2: Introduction to Enterprise Portal Challenges — Problem domain analysis
- Chapter 3: Virtualized Portal Framework — Conceptual architecture
- Chapter 4: Technical Architecture and Mechanics — System design principles

### Part II: The Platform (Chapters 5–11)

- Chapter 5: WBDL (Webbase Definition Language) — Declarative markup language
- Chapter 6: WBPL (Webbase Placeholder Language) — Placeholder management
- Chapter 7: WBLL (Webbase Layout Language) — Component layout management
- Chapter 8: Webbase and Webbaselets
- Chapter 9: Web Spinner Engine Architecture and Mechanics
- Chapter 10: Spin the Web Studio: An Integrated Development Environment
- Chapter 11: Technology Stack and Implementation Mechanics — Deno/TypeScript runtime, WBLL engine, WBPL, session/state, security, and deployment

### Part III: The Web Portal (Chapters 12–13)

- Chapter 12: Structuring a Web Portal: A Practical Guide
- Chapter 13: The Portal Development Journey — Methodology, best practices, and learning patterns for portal developers

### Part IV: The Future (Chapter 14)

- Chapter 14: Future Directions — Roadmap, evolution, and next steps

### Appendices

- Appendix A: WBLL Token Reference — Complete reference for WBLL tokens, syntax, examples, and interpreter behavior
- Appendix B: Webbaselets: BPMS, PLM, and Ticketing — Overview and common design for three foundational webbaselets; includes structured classification and examples
