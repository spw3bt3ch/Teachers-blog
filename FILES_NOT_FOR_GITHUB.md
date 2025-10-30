# ⚠️ Files That Should NOT Be Uploaded to GitHub

This document lists all files and folders that **MUST NOT** be committed to GitHub for security and privacy reasons.

## 🔐 **Critical Security Files**

### **Environment Variables (NEVER COMMIT)**
- `.env` - Main environment file
- `.env.local` - Local development environment variables
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables
- `.env.test` - Test environment variables
- `.env*.local` - Any local environment files

**Why?** These files contain:
- MongoDB connection strings
- NextAuth secrets
- API keys
- Database credentials
- Other sensitive configuration

### **Secrets and Credentials**
- `*.key` - Private keys
- `*.pem` - Certificate files
- `*.p12` - PKCS12 certificates
- `*.pfx` - Personal Information Exchange files
- `secrets/` folder
- `credentials/` folder

## 📦 **Build and Dependency Files**

### **Already in .gitignore (Safe)**
- `/node_modules/` - Node.js dependencies
- `/.next/` - Next.js build output
- `/out/` - Next.js export output
- `/build/` - Build artifacts
- `.vercel/` - Vercel deployment files

## 💾 **Database Files**

### **Database Credentials and Backups**
- `db.json` - Local database files
- `database.json` - Database configuration
- `*.db` - SQLite database files
- `*.sqlite` - SQLite database files
- `*.sqlite3` - SQLite database files

**Note:** We're using MongoDB Atlas, but if you create local database files, they should NOT be committed.

## 🛠️ **Development Tools**

### **IDE and Editor Files**
- `.vscode/` - VS Code settings (unless sharing settings)
- `.idea/` - IntelliJ IDEA settings
- `*.swp` - Vim swap files
- `*.swo` - Vim swap files
- `*~` - Backup files
- `.DS_Store` - macOS folder metadata

## 🖥️ **Operating System Files**

### **OS-Specific Files**
- `.DS_Store` - macOS Finder metadata
- `.DS_Store?` - macOS Finder metadata
- `._*` - macOS resource forks
- `.Spotlight-V100` - macOS Spotlight index
- `.Trashes` - macOS Trash folder
- `Thumbs.db` - Windows thumbnail cache
- `ehthumbs.db` - Windows thumbnail cache

## 📝 **Files Already Protected**

These files are already in `.gitignore` and are safe:

✅ Configuration files that are safe to commit:
- `package.json` - Dependencies (public)
- `tsconfig.json` - TypeScript config (public)
- `tailwind.config.ts` - Tailwind config (public)
- `next.config.js` - Next.js config (public)
- `README.md` - Documentation (public)
- `DEPLOYMENT.md` - Deployment guide (public)
- `SETUP.md` - Setup instructions (public)

## ⚡ **Quick Checklist Before Committing**

Before pushing to GitHub, verify:

- [ ] No `.env` files are included
- [ ] No `.env.local` files are included
- [ ] No database connection strings are hardcoded
- [ ] No API keys are in code files
- [ ] No private keys (`.pem`, `.key`) are included
- [ ] No credentials files are included
- [ ] `node_modules/` is excluded
- [ ] `.next/` folder is excluded
- [ ] `.vercel/` folder is excluded

## 🔍 **How to Check What Will Be Committed**

Before committing, check what files will be added:

```bash
# See what files are staged
git status

# See what will be committed
git diff --cached --name-only

# Search for sensitive files
git ls-files | grep -E '\.env|\.key|\.pem|secrets|credentials'
```

## 🚨 **If You Accidentally Commit Sensitive Files**

If you accidentally commit sensitive files:

1. **Remove from Git tracking:**
   ```bash
   git rm --cached .env
   git rm --cached .env.local
   ```

2. **Add to .gitignore:**
   ```bash
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

3. **Commit the changes:**
   ```bash
   git add .gitignore
   git commit -m "Remove sensitive files and update .gitignore"
   ```

4. **⚠️ IMPORTANT:** If you've already pushed to GitHub:
   - Rotate all secrets (change passwords, regenerate keys)
   - Consider the data compromised
   - Remove the files from Git history (requires force push)

## 📋 **Files Safe to Commit**

These files are **safe** and **should** be committed:

- Source code (`.ts`, `.tsx`, `.js`, `.jsx`)
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Documentation (`.md` files)
- Public assets (`public/` folder)
- Component files
- API route files
- Type definitions
- Styles (`.css` files)
- Test files
- `.gitignore`
- `README.md`
- `DEPLOYMENT.md`
- `SETUP.md`

## 🔐 **Best Practices**

1. **Always use environment variables** for sensitive data
2. **Never hardcode** secrets in source files
3. **Check `.gitignore`** before committing
4. **Use `.env.example`** (with dummy values) for documentation
5. **Rotate secrets** if accidentally committed
6. **Review** what you're committing with `git status`

---

**Remember:** When in doubt, **DON'T COMMIT**. It's better to ask or check than to accidentally expose sensitive information.
