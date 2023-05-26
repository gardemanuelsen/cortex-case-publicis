import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
	plugins: [
		vue(),
	],
	resolve: {
		alias: [
			{
				find: /^@\/(.*)$/,
				replacement: path.resolve(__dirname, "./src") + "/$1"
			},
			{
				find: /^~(.*)$/,
				replacement: "$1"
			},
		]
	},
	server: {
		port: 8080
	}
})
