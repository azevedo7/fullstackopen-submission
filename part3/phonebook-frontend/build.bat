@echo off

:: Navigate to the frontend directory
cd phonebook-frontend

:: Install dependencies (if needed)
call npm install

:: Build the frontend
call npm run build

:: Check if build was successful
if %ERRORLEVEL% neq 0 (
    echo Frontend build failed!
    exit /b %ERRORLEVEL%
)

:: Navigate back to the root directory
cd ..

:: Copy built frontend to backend dist folder
xcopy /E /I /Y "phonebook-frontend\dist" "phonebook-backend"

echo Frontend built and copied to backend successfully!