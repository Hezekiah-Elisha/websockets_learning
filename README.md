# Learning Nodejs(express) with typesdcript

What commands did I use to start the project?

1. Initiated the project

```bash
npm init
```

2. installed express

```bash
npm install express
```

3. Installed Development Dependencies

```bash
npm install -D typescript @types/node @types/express ts-node nodemon
```

- descritption if what I installed
  - `typescript`: The compiler.
  - `@types/node` & `@types/express`: Type definitions so TypeScript understands these libraries.
  - `ts-node`: Allows running .ts files directly during development.
  - `nodemon`: Automatically restarts the server when code changes

4. Configure TypeScript

Generate a `tsconfig.json` file to define how my code is compiled.

```bash
npx tsc init
```

I update my `tsconfig.json` with these key settings to organize my code:

- `"rootDir": "./src"`: Where my TypeScript source files live.
- `"outDir": "./dist"`: Where compiled JavaScript will be placed.
- `"strict": true`: Enables all strict type-checking options.

5. Added Scripts to package.json

I added these commands to my package.json to streamline my workflow:
```json
"scripts": {
  "build": "npx tsc",
  "start": "node dist/app.js",
  "dev": "nodemon src/app.ts"
}
```
6 final(run server)
