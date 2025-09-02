#!/bin/bash
# Prerequisites: Requires pdflatex, bibtex, makeindex, and makeglossaries installed and in PATH
echo "Building SpinTheWeb book..."

echo "Running first pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

echo "Running bibtex..."
bibtex build/main

echo "Running makeindex..."
makeindex build/main

echo "Running makeglossaries..."
makeglossaries build/main

echo "Running second pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

echo "Running third pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

if [ -f "build/main.pdf" ]; then
    cp "build/main.pdf" "SpinTheWeb.pdf"
    echo "PDF successfully created as SpinTheWeb.pdf in root directory"
else
    echo "Build failed - PDF not created"
fi

