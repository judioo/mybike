/**
 * Simple test script to verify review system integration
 * 
 * This script checks that the review system components are properly imported
 * and integrated into all product templates.
 */

const fs = require('fs');
const path = require('path');

// Define the paths to check
const templatesDir = path.join(__dirname, '../components/product/templates');
const templates = [
  'DefaultProductTemplate.tsx',
  'AccessoryProductTemplate.tsx',
  'ServiceProductTemplate.tsx'
];

// Define patterns to check for
const patterns = [
  // Check for dynamic import of ReviewSection
  /dynamic\(\s*\(\s*\)\s*=>\s*import\(['"]\@\/components\/product\/reviews\/ReviewSection['"]\)/,
  // Check for Suspense component
  /<Suspense/,
  // Check for ReviewSection component usage
  /<ReviewSection/
];

// Run the tests
console.log('Testing review system integration...\n');
let allPassed = true;

templates.forEach(template => {
  const filePath = path.join(templatesDir, template);
  console.log(`Checking ${template}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let templatePassed = true;
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      const result = matches ? '✅ PASS' : '❌ FAIL';
      if (!matches) {
        templatePassed = false;
        allPassed = false;
      }
      console.log(`  ${result} ${pattern}`);
    });
    
    console.log(`  ${templatePassed ? '✅ All checks passed' : '❌ Some checks failed'} for ${template}\n`);
  } catch (error) {
    console.error(`  ❌ Error reading ${template}: ${error.message}`);
    allPassed = false;
  }
});

console.log(`\nOverall result: ${allPassed ? '✅ All templates passed' : '❌ Some templates failed'}`);

// Exit with appropriate code
process.exit(allPassed ? 0 : 1);
