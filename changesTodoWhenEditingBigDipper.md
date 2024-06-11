## How to install and use

- First install **yarn**

```sh
npm install --global yarn
```

- Then Edit the package json on the root folder Change PROJECT_NAME => ui
- Then add the .env file
- Now you need to run this command to install npm packages

```sh
yarn install
```

- After installing the packages run the code by using to edit the changes and see where it goes

```sh
yarn run dev
```

- When you finish editing the codes and every thing is ready to go yo can run these commands

```sh
yarn run build

yarn run start
```

## Changes to do

### /Apps/web Folder

**You can safely remove the other folders inside the apps folder if you are using our chain and keep just (Web Folder)**

- Edit local configuration => next-i18next.config
- Edit chain.json file (Add keplr connection configs and coins config)
- Add pages routes into /Apps/web
- Add queries and subscriptions hooks to retrieve data into /Apps/web/graphql

---

### /Packages/tsconfig

- Edit jsx key inside the files to => react-jsx

---

### /Packages/shared-utils

- Add images ,icons and logos into the files for use later

---

### /Packages/ui/Public

- Add and edit the locale files to match the use requirement

---

### /Packages/ui/src

Files to adjust ...

- #### chainConfig
  - Add the voting token type into the chain settings type declaration
- #### components
  - ChainIcon
  - footer
  - holdings_list
  - msg
  - single_trade_mobile
  - nav
    - desktop
    - menu_items
    - title_bar
- #### graphql

  - Add queries and subscriptions hooks to retrieve data into /Apps/web/graphql

- #### models/msg

  Add trade messages to be used into the labels and as a model component

- #### recoil

  Add tryout functionality

- #### screens -- Files to adjust and add ...
  - assets(add)
  - holdings(add)
  - home(modify)
  - app(modify)
  - trades(add)
  - tryout(add)
- #### styles
  Modify the themes and styles to match your preferences

* #### utils/go_to_page

  Add button on the side bar to navigate through the pages

## Issue Reporting

For UI related issues please report it here [https://github.com/GGEZLabs/blockexplorer/issues](https://github.com/GGEZLabs/blockexplorer/issues).
