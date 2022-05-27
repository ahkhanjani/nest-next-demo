__VSCode Extension for Nx:__ nrwl.angular-console

# Bootstrap

1. Install pnpm:

```bash
npm i -g pnpm
```

2. Install Nx CLI:

```bash
pnpm add -g nx
```

3. Install project dependencies:

```bash
pnpm install
```

# Folder Structure

```bash
fullmoon/
├── apps/
├   ├── api/ # main server
├   ├── main-web/ # main next app 
├   └── material-web/ # material dashboard next app
└── libs/ # shared code and app logic
```

# Dev

- API:

```bash
pnpm exec nx serve api
```

- Main Web:

```bash
pnpm exec nx serve main-web
```

- Material Web:

```bash
pnpm exec nx serve material-web
```