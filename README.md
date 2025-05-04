# codefest15-demo-app

See preview on https://codefest15.netlify.app (deployed `packages/modular-architecture-fsd`).

## Packages

- [`modular-architecture`](./packages/modular-architecture/) - project on modular architecture
- [`modular-architecture-fsd`](./packages/modular-architecture-fsd/) - project on modular architecture with feature sliced design
- [`clean-architecture`](./packages/clean-architecture/) - project based on clean architecture

## Generate dependency graph

- pnpm: 

```bash
cd packages/{PACKAGE}
pnpm exec depcruise src --include-only "^src" --output-type dot | dot -T svg > dependency-graph.svg
```

- npx:

```bash
cd packages/{PACKAGE}
npx depcruise src --include-only "^src" --output-type dot | dot -T svg > dependency-graph.svg
```
