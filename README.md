# Fullmoon Core monorepo

## Bootstrap

```bash
# install pnpm globally
npm -g install pnpm

# install nx CLI globally
pnpm -g add nx

# in project root:
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
