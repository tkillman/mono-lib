import { defineConfig } from "cypress";
import { devServer } from "@cypress/vite-dev-server";
import { loadConfigFromFile } from "vite";
import mochaReporter from "cypress-mochawesome-reporter/plugin";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  watchForFileChanges: false,
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      async viteConfig() {
        const viteConfigFile = await loadConfigFromFile({
          command: "serve",
          mode: "test",
        });
        return viteConfigFile?.config;
      },
    },
    specPattern: "cypress/component/*.cy.{ts,tsx}",
    reporter: "cypress-mochawesome-reporter",
    setupNodeEvents(on, config) {
      // 컴포넌트 테스트 결과 보고서
      mochaReporter(on);
      // 코드 커버리지 결과 보고서
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
  e2e: {
    video: true,
    experimentalRunAllSpecs: true, // 전체 테스트를 한번에 실행할 수 있는 ui 옵션
    baseUrl: "http://localhost:4000",
    reporter: "cypress-mochawesome-reporter",
    setupNodeEvents(on, config) {
      // e2e 결과 보고서
      mochaReporter(on);
      // 코드 커버리지 결과 보고서
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
});
