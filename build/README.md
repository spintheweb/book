# Build Directory

This directory contains generated PDF files and LaTeX auxiliary files.

## Generated Files

- `main.pdf` - The complete book PDF
- `*.aux`, `*.log`, etc. - LaTeX auxiliary files

## Building

The build process is automated through VS Code LaTeX Workshop or can be run manually:

```bash
# From project root
pdflatex -output-directory=build main.tex
```

## Cleaning

To clean auxiliary files:

```bash
# Using VS Code: Ctrl+Alt+C (Cmd+Option+C on macOS)
# Or manually:
rm build/*.aux build/*.log build/*.out build/*.toc
```

Note: The PDF file (`main.pdf`) is preserved during cleaning operations.
