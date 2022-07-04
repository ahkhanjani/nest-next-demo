# Fullmoon Core monorepo

## Bootstrap

```bash
npm i -g yarn
yarn global add nx

# In the root directory:
yarn
```

## Folder Structure

```bash
fullmoon/
├── apps/
│   ├── api/ # main server
│   ├── main-web/ # main next app 
│   └── material-web/ # material dashboard next app
└── libs/ # shared code and app logic
    ├── api/
    ├── main-web/
    └── material-web/
```

## Dev

__Only push to 'dev' branch.__

### Start in watch mode

```bash
yarn nx serve <app-name>
```

### Migration

```bash
nx migrate latest
```
