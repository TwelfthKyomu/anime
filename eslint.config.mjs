import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "plugin:react/recommended"),
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react,
			"@typescript-eslint": typescriptEslint,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"no-console": [
				"warn",
				{
					allow: ["warn", "error"],
				},
			],
			"no-unused-vars": "off",
			"react/jsx-curly-spacing": [
				"warn",
				{ when: "always", children: true },
			],
			"react/jsx-fragments": "off",
			"react/static-property-placement": ["error", "static public field"],
			"react/state-in-constructor": ["error", "never"],
			"react/sort-comp": "off",
			"react/require-default-props": "off",
			"react/jsx-boolean-value": "off",
			"react/jsx-props-no-spreading": "off",
			"react/prefer-stateless-function": "off",
			"react/destructuring-assignment": "off",
			"react-hooks/exhaustive-deps": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"object-curly-spacing": ["error", "always"],
			"react/jsx-max-props-per-line": [
				"error",
				{ maximum: 1, when: "always" },
			],
			"react/jsx-filename-extension": [
				1,
				{ extensions: [".jsx", ".tsx"] },
			],
			"react/jsx-one-expression-per-line": "off",
			"react/function-component-definition": [
				2,
				{
					namedComponents: "arrow-function",
				},
			],
			"react/jsx-first-prop-new-line": ["error", "multiline"],
		},
	},
];

export default eslintConfig;
