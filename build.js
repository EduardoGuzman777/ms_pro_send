const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Building MS Pro Send...');

try {
  // Build React app
  console.log('Building React app...');
  execSync('npm run react-build', { stdio: 'inherit' });
  
  // Package Electron app
  console.log('Packaging Electron app...');
  execSync('npm run electron-build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  console.log('Distribution files are located in the "dist" directory.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}