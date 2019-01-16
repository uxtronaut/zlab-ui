# ZPub UI

Frontend for homelab/network administration tooling.

Simple Vue/TypeScript/Bootstrap static app for managing homelab resources

* Hosts (ESXi and Digital Ocean)
* Storage (S3 and Digital Ocean)
* Flynn Clusters
* Apps (static and dynamic, served via Flynn)
* DNS (Route53)

## Environment

```
VUE_APP_OAUTH_ROOT=http://localhost:3001
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
