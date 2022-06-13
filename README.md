__VSCode Extension for Nx:__ `nrwl.angular-console`

# Bootstrap

1. Install pnpm:

```bash
npm i -g yarn
```

2. Install Nx CLI:

```bash
npm i -g nx
```

3. Install project dependencies:

```bash
# at project root
yarn
```

# Folder Structure

```bash
fullmoon/
├── apps/
├   ├── api/ # main server
├   ├── main-web/ # main next app 
├   └── material-web/ # material dashboard next app
└── libs/ # shared code and app logic
    ├── api/
    ├── main-web/
    └── material-web/
```

# Dev

## Start in watch mode

- Watch API:

```bash
yarn nx serve api
```

- Watch Main Web:

```bash
yarn nx serve main-web
```

- Watch Material Web:

```bash
yarn nx serve material-web
```
