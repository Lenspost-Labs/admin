
# Lenspost Admin Dashboard

This is the official repository for Lenspost Admin



## For Local Development

 Clone the Repo and Install all the dependencies

Backend
```bash
    1. cd backend 
```
```bash
    2. yarn && yarn dev
```

Frontend
```bash
    1. cd frontend 
```
```bash
    2. yarn && yarn dev
```



## Environmental Variables
 Use the .env.example template for env

 

## Developers using this codebase

Here's a quick guide while using imports : 
- Do not use relative imports 
    -   Ex : `../../../component`

        instead, use `src/folderName/subFolderName/component`
    
    - Always start imports with `src` (since it is already configured for this project in `tsconfig.json` and `vite.config.ts)`



## Deployment

- [Live](https://admin.lenspost.xyz)
- [Staging](https://thunderous-bienenstitch-10e784.netlify.app/)

