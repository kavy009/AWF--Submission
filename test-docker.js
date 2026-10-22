/**
 * Practical 11 Automated Verification Suite
 * Validates Dockerfiles, .dockerignore files, and docker-compose.yml configuration
 * against the ITUE301 syllabus and Docker specifications.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n================================================================');
console.log('🐳 PRACTICAL 11: DOCKER & DOCKER COMPOSE VERIFICATION SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// -----------------------------------------------------------------------------
// STEP 1: Verify Docker CLI & Docker Compose Tooling
// -----------------------------------------------------------------------------
console.log('--- STEP 1: Checking Docker & Docker Compose CLI Installation ---');
try {
  const dockerVersion = execSync('docker --version', { encoding: 'utf-8' }).trim();
  assert(dockerVersion.toLowerCase().includes('docker version'), `Docker CLI is installed (${dockerVersion})`);
} catch (err) {
  assert(false, `Docker CLI check failed: ${err.message}`);
}

try {
  const composeVersion = execSync('docker compose version', { encoding: 'utf-8' }).trim();
  assert(composeVersion.toLowerCase().includes('docker compose version'), `Docker Compose is installed (${composeVersion})`);
} catch (err) {
  assert(false, `Docker Compose check failed: ${err.message}`);
}

// -----------------------------------------------------------------------------
// STEP 2: Validate Backend Dockerfile & .dockerignore
// -----------------------------------------------------------------------------
console.log('\n--- STEP 2: Validating Backend Dockerfile & .dockerignore ---');
const backendDockerfilePath = path.join(__dirname, 'backend', 'Dockerfile');
assert(fs.existsSync(backendDockerfilePath), 'backend/Dockerfile exists');

const backendDockerfile = fs.readFileSync(backendDockerfilePath, 'utf-8');
assert(backendDockerfile.includes('FROM node:'), 'Backend Dockerfile uses valid Node.js base image');
assert(backendDockerfile.includes('WORKDIR /app'), 'Backend sets WORKDIR to /app');
assert(backendDockerfile.includes('COPY package*.json'), 'Backend copies package manifests first for layer caching');
assert(backendDockerfile.includes('RUN npm install'), 'Backend runs npm install inside container');
assert(backendDockerfile.includes('EXPOSE 5000'), 'Backend exposes API port 5000');
assert(backendDockerfile.includes('CMD ["node", "server.js"]'), 'Backend CMD runs "node server.js"');

const backendIgnorePath = path.join(__dirname, 'backend', '.dockerignore');
assert(fs.existsSync(backendIgnorePath), 'backend/.dockerignore exists');
const backendIgnore = fs.readFileSync(backendIgnorePath, 'utf-8');
assert(backendIgnore.includes('node_modules'), 'backend/.dockerignore excludes node_modules');
assert(backendIgnore.includes('.env'), 'backend/.dockerignore excludes .env secrets');

// -----------------------------------------------------------------------------
// STEP 3: Validate Frontend Dockerfile & .dockerignore (Multi-Stage Build)
// -----------------------------------------------------------------------------
console.log('\n--- STEP 3: Validating Frontend Dockerfile (Multi-Stage Build) ---');
const frontendDockerfilePath = path.join(__dirname, 'Portfolio', 'Dockerfile');
assert(fs.existsSync(frontendDockerfilePath), 'Portfolio/Dockerfile exists');

const frontendDockerfile = fs.readFileSync(frontendDockerfilePath, 'utf-8');
assert(frontendDockerfile.includes('AS builder'), 'Frontend Dockerfile implements Stage 1 (builder)');
assert(frontendDockerfile.includes('RUN npm run build'), 'Frontend runs npm run build in build stage');
assert(frontendDockerfile.includes('AS runner'), 'Frontend Dockerfile implements Stage 2 (runner multi-stage optimization)');
assert(frontendDockerfile.includes('--from=builder'), 'Frontend copies built assets from builder stage');
assert(frontendDockerfile.includes('EXPOSE 5173'), 'Frontend exposes preview web server port 5173');
assert(frontendDockerfile.includes('CMD') && frontendDockerfile.includes('preview'), 'Frontend serves built production app with preview');

const frontendIgnorePath = path.join(__dirname, 'Portfolio', '.dockerignore');
assert(fs.existsSync(frontendIgnorePath), 'Portfolio/.dockerignore exists');
const frontendIgnore = fs.readFileSync(frontendIgnorePath, 'utf-8');
assert(frontendIgnore.includes('node_modules'), 'Portfolio/.dockerignore excludes node_modules');
assert(frontendIgnore.includes('dist'), 'Portfolio/.dockerignore excludes dist directory');

// -----------------------------------------------------------------------------
// STEP 4: Validate docker-compose.yml Structure & Inter-Service Networking
// -----------------------------------------------------------------------------
console.log('\n--- STEP 4: Validating docker-compose.yml Configuration ---');
const composePath = path.join(__dirname, 'docker-compose.yml');
assert(fs.existsSync(composePath), 'docker-compose.yml exists at project root');

const composeContent = fs.readFileSync(composePath, 'utf-8');
assert(composeContent.includes('mongodb:'), 'docker-compose.yml defines mongodb service');
assert(composeContent.includes('backend:'), 'docker-compose.yml defines backend service');
assert(composeContent.includes('frontend:'), 'docker-compose.yml defines frontend service');

// Port mappings
assert(composeContent.includes('"27017:27017"'), 'MongoDB port 27017 mapped correctly');
assert(composeContent.includes('"5000:5000"'), 'Backend port 5000 mapped correctly');
assert(composeContent.includes('"5173:5173"'), 'Frontend port 5173 mapped correctly');

// Networking & Service Name Resolution
assert(composeContent.includes('mongodb://mongodb:27017/taskdb'), 'Backend connects to MongoDB via service name "mongodb" (not localhost)');
assert(composeContent.includes('app-network'), 'All services joined to custom bridge network "app-network"');

// Dependency graph & Volumes
assert(composeContent.includes('depends_on:') && composeContent.includes('- mongodb'), 'Backend depends_on mongodb service');
assert(composeContent.includes('depends_on:') && composeContent.includes('- backend'), 'Frontend depends_on backend service');
assert(composeContent.includes('mongo-data:/data/db') && composeContent.includes('mongo-data:'), 'Named volume "mongo-data" defined for MongoDB persistence');

// -----------------------------------------------------------------------------
// SUMMARY & VIVA CHECKLIST
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log('🏆 PRACTICAL 11 VERIFICATION SUMMARY');
console.log('================================================================');
console.log(`Passed Checks: ${passedTests} / ${totalTests} (${Math.round((passedTests / totalTests) * 100)}%)`);

if (passedTests === totalTests) {
  console.log('\n✨ ALL PRACTICAL 11 CONFIGURATION & DOCKER ASSETS VALIDATED SUCCESSFULLY!');
  console.log('\nTo launch the complete containerized stack in one command:');
  console.log('   docker compose up --build');
  console.log('\nTo verify running containers:');
  console.log('   docker ps');
  console.log('\nTo shut down the containers:');
  console.log('   docker compose down\n');
} else {
  console.error('\n⚠️ Some checks failed. Please inspect the logs above.\n');
  process.exit(1);
}
