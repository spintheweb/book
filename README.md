# The Spin the Web Book

A comprehensive LaTeX book project documenting the **Spin the Web Project** - a framework for building enterprise web portals using WBDL, Web Spinner, and Studio.

## Project Structure

```
├── main.tex                    # Main document file
├── preamble/                   # LaTeX configuration
│   ├── packages.tex           # Package imports
│   ├── formatting.tex         # Style definitions
│   └── commands.tex           # Custom commands
├── frontmatter/               # Book front matter
│   ├── titlepage.tex          # Title and copyright pages
│   ├── abstract.tex           # Abstract
│   └── preface.tex            # Preface
├── part1-foundations/         # Part I: Foundations and Concepts
├── part2-wbdl/               # Part II: WBDL Language
├── part3-wbpl/               # Part III: WBPL Language  
├── part4-wbll/               # Part IV: WBLL Language
├── part5-spinner/            # Part V: Web Spinner Engine
├── part6-studio/             # Part VI: Spin the Web Studio
├── part7-implementation/     # Part VII: Implementation
├── part8-advanced/           # Part VIII: Advanced Topics
├── appendices/               # Appendices
├── figures/                  # Images and diagrams
├── code-examples/            # Code listings
├── bibliography/             # References
└── build/                    # Generated PDFs
```

## Prerequisites

### Required Software

1. **LaTeX Distribution**:
   - **Windows**: MiKTeX or TeX Live
   - **macOS**: MacTeX
   - **Linux**: TeX Live

2. **VS Code Extensions**:
   - LaTeX Workshop (already configured)

3. **Additional Tools**:
   - Python 3.x (for Pygments/minted syntax highlighting)
   - Perl (usually included with LaTeX distributions)

### Installation Instructions

#### Windows (MiKTeX)
```bash
# Download and install MiKTeX from https://miktex.org/download
# Install Python and Pygments
pip install Pygments

# Install missing packages (MiKTeX will prompt automatically)
```

#### macOS (MacTeX)
```bash
# Download and install MacTeX from https://www.tug.org/mactex/
# Install Python and Pygments
pip3 install Pygments
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install texlive-full python3-pygments
sudo apt-get install texlive-latex-extra texlive-fonts-recommended
```

## Building the Book

### Using VS Code (Recommended)

1. Open the project in VS Code
2. Open `main.tex`
3. Use **Ctrl+Alt+B** (or **Cmd+Option+B** on macOS) to build
4. Use **Ctrl+Alt+V** (or **Cmd+Option+V** on macOS) to view PDF

### Using Command Line

```bash
# Basic build
pdflatex -output-directory=build main.tex

# Full build with index and glossary
pdflatex -output-directory=build main.tex
makeindex build/main.idx
makeglossaries build/main
pdflatex -output-directory=build main.tex
pdflatex -output-directory=build main.tex
```

### Using Make (if Makefile provided)

```bash
make          # Build PDF
make clean    # Clean auxiliary files
make view     # Open PDF viewer
```

## VS Code Configuration

The project includes optimized VS Code settings for LaTeX development:

- **Auto-completion**: Intelligent LaTeX command completion
- **Syntax highlighting**: Professional syntax coloring
- **Error detection**: Real-time error highlighting
- **PDF preview**: Integrated PDF viewer with SyncTeX
- **Build recipes**: Multiple build configurations
- **Clean commands**: Easy cleanup of auxiliary files

### Key Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Build | Ctrl+Alt+B | Cmd+Option+B |
| View PDF | Ctrl+Alt+V | Cmd+Option+V |
| Clean | Ctrl+Alt+C | Cmd+Option+C |
| SyncTeX | Ctrl+Click | Cmd+Click |

## Writing Guidelines

### Chapter Structure

Each chapter should follow this structure:
```latex
\chapter{Chapter Title}
\label{chap:short-name}

% Opening quote (optional)
\begin{quote}
\textit{"Quote text"} \\
— Author
\end{quote}

\section{Introduction}
% Chapter content...

\section{Chapter Summary}
% Summary and transition to next chapter
```

### Custom Commands

The project includes many custom commands for consistency:

```latex
% Project terminology
\wbdl{}          % WBDL
\webspinner{}    % Web Spinner
\studio{}        # Spin the Web Studio

% Element types
\stwsite{}       % STWSite
\stwpage{}       % STWPage

% Code references
\code{filename.ext}
\inlinecode{variable}

% Special boxes
\begin{examplebox}
Example content
\end{examplebox}

\begin{warningbox}
Warning content
\end{warningbox}
```

### Figure Guidelines

```latex
\begin{figure}[htbp]
\centering
\includegraphics[width=0.8\textwidth]{figures/diagram.png}
\caption{Figure caption}
\label{fig:diagram}
\end{figure}

% Reference with: \figref{fig:diagram}
```

### Code Listings

```latex
% XML code
\begin{lstlisting}[style=xmlstyle,caption=Example XML]
<element attribute="value">
    Content
</element>
\end{lstlisting}

% JSON code  
\begin{lstlisting}[style=jsontstyle,caption=Example JSON]
{
    "property": "value"
}
\end{lstlisting}
```

## Contributing

### Adding New Chapters

1. Create new `.tex` file in appropriate part directory
2. Add `\input{path/to/chapter}` in `main.tex`
3. Follow the established chapter structure
4. Update this README if adding new parts

### Adding Figures

1. Place images in `figures/` directory
2. Use descriptive filenames
3. Prefer vector formats (PDF, SVG) when possible
4. Include source files for diagrams

### Code Examples

1. Place complete code examples in `code-examples/`
2. Reference from text using `\codefile{}`
3. Test all code examples before inclusion

## Troubleshooting

### Common Build Errors

**Missing packages**: Allow MiKTeX to install automatically, or install manually:
```bash
# MiKTeX
mpm --install package-name

# TeX Live
tlmgr install package-name
```

**Pygments/minted errors**: Ensure Python and Pygments are installed:
```bash
pip install Pygments
```

**Bibliography errors**: Ensure BibTeX runs after first LaTeX pass:
```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

### VS Code Issues

**LaTeX Workshop not working**: 
1. Verify LaTeX distribution is in PATH
2. Reload VS Code window
3. Check extension settings

**PDF not updating**:
1. Try manual build with Ctrl+Alt+B
2. Clean auxiliary files with Ctrl+Alt+C
3. Check for compilation errors

## License

[Specify your license here]

## Author

[Your Name]  
[Your Email]  
[Your Organization]

## Version History

- **v1.0** - Initial project setup with complete LaTeX structure
- **v0.9** - Template creation and VS Code configuration

---

For questions or issues, please open an issue in the project repository.
