# Project doc spec

Items to initialize when scaffolding a project.

## Assertive checklist

### Project

- [ ] The architecture conforms to the chosen pattern.
- [ ] `aidd_docs` is initialized.
- [ ] `.git` and remote repo exist.
- [ ] Dependency manager chosen, deps install and the app boots.

### Quality

- [ ] Commit linter installed.
- [ ] Pre-commit gate passes (with quality under and unit tests).
- [ ] Auto formatting configured
- [ ] Lint passes
- [ ] Typecheck

### Testing

- [ ] A unit test passes.
- [ ] An end-to-end test passes.

### Deployment

- [ ] CI config commited and passing on server.
- [ ] If a container/runtime is used, it ups and downs cleanly.

### App

- [ ] `INSTALL.md` filled with proper chosen techs.

#### Frontend only

- [ ] A11y UI lib installed.
- [ ] A form submits with validator lib and tested.
- [ ] Lighthouse thresholds configured.
- [ ] Design System Created.
- [ ] Default pages: 404, 403 etc.
