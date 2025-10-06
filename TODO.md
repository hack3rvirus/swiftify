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

# Admin Login Fix

## Steps to Complete
- [x] Analyze admin login issue
- [x] Identify potential causes: extra spaces in key, quotes in env var
- [x] Modify backend to strip key and add debug print
- [x] Modify frontend to trim key on input
- [ ] Commit and push changes to trigger redeploy on Render and Netlify
- [ ] Test admin login after redeploy
- [ ] If still fails, check Render logs for debug output to compare hashes
- [ ] If hashes don't match, verify the ADMIN_KEY value in Render dashboard (ensure no quotes)
