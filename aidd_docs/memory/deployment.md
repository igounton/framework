# Deployment

## CI/CD Pipeline

### GitHub Actions (`ci.yml`)

- **Steps**:
  1. `commitlint`: validate commit messages on PRs (skipped for release-please branches)
  2. `release-please`: auto-create release PRs and GitHub releases on push to `main`
  3. `build-and-attach`: run only on release; builds plugin dist archives and attaches them to the GitHub release

- **Deployment Triggers**:
  - Automated: push to `main` triggers release-please; release creation triggers build-and-attach
  - Manual: none

## Deployment Process

- **Release steps**:
  1. Merge PR to `main` with conventional commits
  2. `release-please` opens a release PR bumping versions in `marketplace.json` and per-plugin `plugin.json`
  3. Merging the release PR triggers `build-and-attach`
  4. `scripts/build-dist.sh` builds per-plugin distribution archives
  5. Archives and source tarball attached to the GitHub release asset

## Infrastructure

## Project Structure

```plaintext
framework/
  plugins/         ← plugin source (one dir per plugin)
  scripts/         ← build-dist.sh, aidd.sh
  .claude-plugin/  ← marketplace.json (version manifest)
  .github/
    workflows/     ← ci.yml, add-to-project.yml
```

## URLs

- **Repository**: https://github.com/ai-driven-dev/aidd (monorepo, `framework/` subdirectory)
- **Package registry**: https://npm.pkg.github.com/@ai-driven-dev/cli
