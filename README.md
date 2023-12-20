
# Lenspost Admin Dashboard

This is the official repository for Lenspost Admin



## For Local Development

 Clone the Repo and Install all the dependencies

```bash
    1. cd backend 
```
```bash
    2. yarn && yarn dev
```

Run the backend service and Start the Frontend server

```bash
    1. yarn && yarn dev
```



## Environmental Variables
 Use the .env.example template for env in the backend folder 

 

## Deployment

- [Live](https://admin.lenspost.xyz)
- [Staging](https://thunderous-bienenstitch-10e784.netlify.app/)


## Developers using this codebase

Here's a quick guide while using imports : 
    1. Do not use relative imports Ex : ../../../component
        instead, use src/folderName/subFolderName/component
    
        Always start imports with `src` (since it is already configured for this project in tsconfig.json and vite.config.ts)