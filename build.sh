#!/bin/bash
echo "Building SpinTheWeb book..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex
if [ -f "build/main.pdf" ]; then
    cp "build/main.pdf" "build/SpinTheWeb.pdf"
    echo "PDF successfully created as SpinTheWeb.pdf"
else
    echo "Build failed - PDF not created"
fi
