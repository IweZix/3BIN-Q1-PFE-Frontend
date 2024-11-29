<h1 align="center"> vue-boilerplate </h1>

<div align="center">
    <a href="https://img.shields.io/github/license/IweZix/WezBot"><img src="https://img.shields.io/github/license/IweZix/vue-boilerplate" alt="license"/></a>
    <a href="https://img.shields.io/github/forks/IweZix/WezBot"><img src="https://img.shields.io/github/forks/IweZix/vue-boilerplate" alt="forks"/></a>
    <a href="https://img.shields.io/github/languages/count/IweZix/WezBot"><img src="https://img.shields.io/github/languages/count/IweZix/vue-boilerplate" alt="language-count"/></a>
    <a href="https://img.shields.io/github/issues-pr/IweZix/WezBot"><img src="https://img.shields.io/github/issues-pr/IweZix/vue-boilerplate" alt="pull-requests"/></a>
</div>

Boilerplate for your modern Vue.js project with Vue Router and Bootstrap using :

- TypeScript
- Vue.js
- Vue Router
- Bootstrap

## ⚒️ Project setup

> if you don't have clone the repository yet, you can clone it by running one of the following commands:

```bash
git clone https://github.com/IweZix/vue-boilerplate.git
```

```bash
git clone https://github.com/IweZix/vue-boilerplate.git name-of-your-project
```

> if you have already cloned the repository, you can remove the `.git` folder by running the following command:

```bash
rm -rf .git
```

> then you can install the dependencies by running the following commands:

```bash
cd name-of-your-project
```

> then you can install the dependencies by running the following commands:

```bash
npm install
```

## 🔄 Compiles and hot-reloads for development

> you can run the following command to start the development server:

```bash
npm run dev
```

## ✅ TypeCheck, Linter & Formatter

> Check types

```bash
npm run type-check
```

> Check lint errors

```bash
npm run lint
```

> Format files

```bash
npm run format
```

## Request & Promises

I recommend using Axios for making requests and using Promises.

You can configure the API's base URL in the `vite.config.ts` file. By default, it is set to `http://localhost:3000`.

If you want to do some requests, you can use the following code:

```ts
// if your URL is http://localhost:3000/users/userAScending
// replace http://localhost:3000 by /api
axios.get('/api/users/userAScending')
  .then((response) => {
    // code to execute if the request is successful
  })
  .catch((error) => {
    // code to execute if the request fails
  });
```

## 📃 Documentation

- [Vue.js](https://v3.vuejs.org/)
- [Vue Router](https://router.vuejs.org)
- [Bootstrap](https://getbootstrap.com)
- [TypeScript](https://www.typescriptlang.org)
