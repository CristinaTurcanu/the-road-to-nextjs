import { FlatCompat } from "@eslint/eslintrc";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort"; // ✅ Add this
import { dirname } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            'simple-import-sort': pluginSimpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            "indent": ["error", 4],
        },
    },
];

export default eslintConfig;
