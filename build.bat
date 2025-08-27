@echo off
echo Building SpinTheWeb book...
pdflatex -output-directory=build -synctex=1 -interaction=nonstopmode main.tex
if exist "build\main.pdf" (
    copy "build\main.pdf" "build\SpinTheWeb.pdf"
    move "build\SpinTheWeb.pdf" "SpinTheWeb.pdf"
    echo PDF successfully created as SpinTheWeb.pdf in root directory
) else (
    echo Build failed - PDF not created
)
