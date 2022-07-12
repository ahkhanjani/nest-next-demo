# Fullmoon Core monorepo

## Bootstrap

```bash
npm i -g pnpm
pnpm -g add nx

# In the root directory:
pnpm install
```

## Folder Structure

```bash
fullmoon-core/
├── apps/
│   ├── api/ # main server
│   ├── main-web/ # main next app 
│   └── material-web/ # material dashboard next app
└── libs/ # most of the app logic
    ├── api/
    ├── main-web/
    ├── material-web/
    └── shared/ # shared code and app logic
```

## Dev

__Only push to 'dev' branch.__

### Start in watch mode

```bash
pnpm start <app-name>
```

### Migration

```bash
pnpm migrate
```
