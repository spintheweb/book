#!/bin/bash
echo "Building SpinTheWeb book..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex
if [ -f "build/main.pdf" ]; then
    cp "build/main.pdf" "build/SpinTheWeb.pdf"
    mv "build/SpinTheWeb.pdf" "SpinTheWeb.pdf"
    echo "PDF successfully created as SpinTheWeb.pdf in root directory"
else
    echo "Build failed - PDF not created"
fi
