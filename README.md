# ⏺️ Capterra - screen recording app

This app helps you to record , upload and also share your videos across the platform with others . 😍




## 📷 Screenshots

<img width="1918" height="906" alt="Screenshot 2025-11-08 230141" src="https://github.com/user-attachments/assets/3a964b8c-ab1e-4e93-8dd9-84277f621e96" />


## 🚀 Demo


[Click here to see demo](https://capterra.vercel.app)


## ⚙️ Tech Stack

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="40" alt="tailwindcss logo"  />

</div>


## ✨ Features

👉 **Screen Recording**: Capture your screen directly within the app . 

👉 **Authentication**: Secure user auth with Better-Auth & Google provider.  

👉 **Arcjet Integration**: Implement bot protection, rate limiting, email validation for enhancing the app security.

👉 **Modern Tech Stack**: Built with Next.js 16 for a fast, production-ready web app. 
 
👉 **Share Videos**: Share videos via unique links for easy access and distribution.  
 
👉 **Database Integration**: Utilize Neon for manage data in database.  

👉 **Type-Safe Queries**: Using Drizzle ORM’s type-safe queries for secure and efficient database interactions.  
 
👉 ** Respovive Design **: Fully responsive design for all sceens and devices .  





##  🛠️ Installation 

Clone the project

```bash
  git clone https://github.com/YasinMahmoudi/screen-recorder.git
```

Go to the project directory

```bash
  cd screen-recorder
```

Install the project dependencies using pnpm : 

```bash
  pnpm install
```

Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content \
Or use `.env.example` provided in the root directory :

    # BASE URL
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    
    
    #BETTER AUTH
    BETTER_AUTH_SECRET=
    BETTER_AUTH_URL=http://localhost:3000 
    
    
    #GOOGLE
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    
    # Recommended for most uses
    DATABASE_URL=
    
    # For uses requiring a connection without pgbouncer
    DATABASE_URL_UNPOOLED=
    
    # Parameters for constructing your own connection string
    PGHOST=
    PGHOST_UNPOOLED=
    PGUSER=
    PGDATABASE=
    PGPASSWORD=
    
    # Parameters for Vercel Postgres Templates
    POSTGRES_URL=postgresql:
    POSTGRES_URL_NON_POOLING=
    POSTGRES_USER=
    POSTGRES_HOST=
    POSTGRES_PASSWORD=
    POSTGRES_DATABASE=
    POSTGRES_URL_NO_SSL=postgresql:
    POSTGRES_PRISMA_URL=postgresql:
    
    # Neon Auth environment variables for Next.js
    NEXT_PUBLIC_STACK_PROJECT_ID=
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
    STACK_SECRET_SERVER_KEY=
    
    #BUNNY
    BUNNY_STORAGE_ACCESS_KEY=
    BUNNY_LIBRARY_ID=
    BUNNY_STREAM_ACCESS_KEY=
    
    #ARCJET
    ARCJET_KEY=


Start the server

```bash
  pnpm dev
```

