# Frontend Reorganization Plan

## Steps to Complete
- [ ] Create frontend/ folder
- [ ] Move frontend files to frontend/:
  - [ ] src/
  - [ ] index.html
  - [ ] vite.config.ts
  - [ ] package.json
  - [ ] package-lock.json
  - [ ] postcss.config.js
  - [ ] tailwind.config.js
  - [ ] tsconfig.app.json
  - [ ] tsconfig.json
  - [ ] tsconfig.node.json
  - [ ] eslint.config.js
  - [ ] .netlifyignore
- [ ] Move pyproject.toml to backend/
- [ ] Remove runtime.txt from root
- [ ] Update build.sh to cd into frontend/
- [ ] Update netlify.toml for frontend/ build
- [ ] Update vite.config.ts if needed
- [ ] Test local build
- [ ] Verify Netlify deployment
