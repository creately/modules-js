# Creately Modules

This is a monorepo which hosts source code for javascript modules by Creately. The repo also uses **Github Actions** to build these modules and publish them to both **npm** and **Github Package Registry**. All modules are available under the `packages` directory.

### How to add a new module?

Create a new directory inside `packages` and add the module source code there. The new directory must have a `package.json` in it. The directory name must be equal to the module name without the prefix.

Example:

```
dir: packages/hello-world
pkg: @creately/hello-world
```

### How to modify a module?

As usual, create a pull-request with the change to the `master` branch. Merging code will *not* publish a new version to the registry. To release a new version, update the `version` field in the `package.json` file.

### How to install a module?

Modules can be installed using `npm install` because they will be available on npm.

---

### TODO:

- [ ] Setup pull-request validation using Github Actions
