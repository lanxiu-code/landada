import { defineConfig } from "umi";
import routes from "./routes";
import proxy from "./proxy";
const { REACT_APP_ENV = "dev" } = process.env;
export default defineConfig({
  routes: routes,
  npmClient: "pnpm",
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  title: "蓝答答-智能平台",
  conventionLayout: false,
  plugins: [
    "@umijs/plugins/dist/initial-state",
    "@umijs/plugins/dist/model",
    "@umijs/plugins/dist/access",
  ],
  initialState: {},
  model: {},
  access: {},
});
