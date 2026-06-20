import coreWebVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = [
  {
    // Don't lint vendored/generated artifacts or bundled WASM sim pages —
    // ESLint flat config does NOT read .gitignore, so these must be listed here.
    ignores: [
      "sort/**",
      ".venv_pdf/**",
      "**/.next/**",
      "public/fusor-sim/**",
      "public/donut-sim/**",
    ],
  },
  ...coreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default eslintConfig
