/// <reference types="cypress" />

import "./commands"; // 선택적: 커스텀 명령어 정의 시

// 예: 전역 스타일 import
import "../../src/index.css";

import { mount, MountOptions, MountReturn } from "cypress/react";
import { ReactNode } from "react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        children: ReactNode,
        options?: MountOptions
      ): Chainable<MountReturn>;
    }
  }
}

// mount를 전역 등록해서 cy.mount(...) 사용 가능하게
Cypress.Commands.add("mount", mount);
