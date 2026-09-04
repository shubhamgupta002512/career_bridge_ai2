Write-Host "Starting CareerBridge AI Backend Server..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server/server.js" -WorkingDirectory "c:\Users\shubham gupta\OneDrive\Desktop\ck\careerbridge-ai"

Write-Host "Starting CareerBridge AI Frontend Server..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "c:\Users\shubham gupta\OneDrive\Desktop\ck\careerbridge-ai\client"

Write-Host "Servers are starting. Press Ctrl+C to terminate." -ForegroundColor Yellow
