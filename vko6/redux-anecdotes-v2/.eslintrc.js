module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true
	},
	"extends": ["eslint:recommended", "plugin:jest/recommended", "plugin:react/recommended"],
	'parser': 'babel-eslint',
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"jest"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"arrow-spacing": [
			"error", {"before": true, "after": true}
		],
		"no-console": 0,
		"react/prop-types": 0,
		"eqeqeq": "error",
		"no-trailing-spaces": "error"
	},
	"settings": {
		"react": {
			"createClass": "createReactClass", // Regex for Component Factory to use,
											   // default to "createReactClass"
			"pragma": "React",  // Pragma to use, default to "React"
			"version": "15.0", // React version, default to the latest React stable release
			"flowVersion": "0.53" // Flow version
		},
		"propWrapperFunctions": ["forbidExtraProps"] // The names of any functions used to wrap the
													 // propTypes object, e.g. `forbidExtraProps`.
													 // If this isn't set, any propTypes wrapped in
													 // a function will be skipped.
	}
}