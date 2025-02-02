import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

if (typeof structuredClone === 'undefined') {
	globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

export default [
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2021,
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react: reactPlugin,
			"@typescript-eslint": typescriptEslintPlugin,
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
			"@typescript-eslint/no-unused-vars": "off",
			"react/jsx-curly-spacing": ["warn", {when: "always", children: true}],
			"react/jsx-fragments": "off",
			"react/static-property-placement": ["error", "static public field"],
			"react/state-in-constructor": ["error", "never"],
			"react/sort-comp": "off",
			"react/require-default-props": "off",
			"react/display-name": "off",
			"react/jsx-boolean-value": "off",
			"react/jsx-props-no-spreading": "off",
			"react/prefer-stateless-function": "off",
			"react/destructuring-assignment": "off",
			"react-hooks/exhaustive-deps": "off",
			"object-curly-spacing": ["error", "always"],
			"react/jsx-max-props-per-line": ["error", {maximum: 1, when: "always"}],
			"react/jsx-filename-extension": [1, {extensions: [".jsx", ".tsx"]}],
			"react/jsx-one-expression-per-line": "off",
			"react/function-component-definition": [
				2,
				{
					namedComponents: "arrow-function",
				},
			],
			"react/jsx-first-prop-new-line": ["error", "multiline"],
			"prefer-const": ["error", {ignoreReadBeforeAssign: true}],
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];