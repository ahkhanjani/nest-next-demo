__VSCode Extension for Nx:__ `nrwl.angular-console`

# Bootstrap

```bash
npm i -g yarn
yarn global add nx

# In the root directory:
yarn
```

# Folder Structure

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

# Dev

__Only push to 'dev' branch.__

## Start in watch mode

- Run apps in watch mode

```bash
yarn nx serve APP_NAME
# Replace APP_NAME with the app name.
# e.g. yarn nx serve main-web
```
