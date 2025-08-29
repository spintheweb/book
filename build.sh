#!/bin/bash
echo "Building SpinTheWeb book..."

echo "Running first pdflatex pass..."
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex

echo "Running bibtex..."
(cd build && bibtex main)

echo "Running makeindex..."
(cd build && makeindex main.idx)

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

