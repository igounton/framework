module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [0, "always"],
    "subject-case": [0, "never"],
    "body-max-line-length": [0, "always"],
    "footer-max-line-length": [0, "always"],
    "header-max-length": [1, "always", 120],
  },
};
