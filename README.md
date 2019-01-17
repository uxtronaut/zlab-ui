# zlab-ui

Frontend for homelab/network administration tooling.

Simple Vue/TypeScript/Bootstrap static app for managing homelab resources

* Hosts (ESXi and Digital Ocean)
* Flynn Clusters
* Sites (static and dynamic, served via Flynn)
* Backups
* Deployments

## Environment

```
VUE_APP_API_ROOT=http://localhost:3000/api
```

## Scripts
Project setup
```
yarn install
```

Compiles and hot-reloads for development
```
yarn run serve
```

Compiles and minifies for production
```
yarn run build
```

Run tests
```
yarn run test
```

Lint
```
yarn run lint
```

End-to-end tests
```
yarn run test:e2e
```
