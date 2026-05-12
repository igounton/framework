module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      1,
      "always",
      [
        "aidd-context",
        "aidd-dev",
        "aidd-vcs",
        "aidd-pm",
        "aidd-refine",
        "aidd-orchestrator",
        "framework",
      ],
    ],
    "body-max-line-length": [0, "always"],
    "footer-max-line-length": [0, "always"],
    "header-max-length": [1, "always", 120],
  },
};
