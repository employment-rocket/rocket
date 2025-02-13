import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
	const envDir = path.resolve(__dirname, "config-files");
	const env = loadEnv(mode, envDir);

	return {
		plugins: [react()],

		envDir,

		define: {
			__API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
			global: {},
		},

		build: {
			outDir: "dist",
		},
	};
});
