#!/bin/bash
# Prerequisites: Requires pdflatex, bibtex, makeindex, and makeglossaries installed and in PATH
set -e
echo "Building SpinTheWeb book..."

echo "Running first pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

echo "Running bibtex..."
bibtex build/main

echo "Running makeindex..."
makeindex build/main

echo "Running makeglossaries (glossary + acronyms)..."
# Check if makeglossaries is available
if command -v makeglossaries >/dev/null 2>&1; then
    # Use -d to point to the build directory and pass the basename only
    makeglossaries -d build main
else
    echo "Warning: makeglossaries not found, skipping glossary processing"
fi

echo "Running second pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

echo "Running third pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

if [ -f "build/main.pdf" ]; then
    # Remove old root PDF to avoid stale cache/confusion
    rm -f "SpinTheWeb.pdf" || true
    cp "build/main.pdf" "SpinTheWeb.pdf"
    echo "PDF successfully created as SpinTheWeb.pdf in root directory"
    
    # Create deployment directory for GitHub Pages
    echo "Preparing deployment assets..."
    rm -rf "deploy" || true
    mkdir -p "deploy"
    
    # Copy web assets for GitHub Pages deployment
    cp "index.html" "deploy/"
    cp "SpinTheWeb.pdf" "deploy/"
    
    # Copy logo and figures if they exist
    if [ -d "figures" ]; then
        cp -r "figures" "deploy/"
    fi
    
    echo "Deployment assets prepared in deploy/ directory"
else
    echo "Build failed - PDF not created"
    exit 1
fi

