describe("설정 확인", () => {
  it("Cypress가 정상적으로 작동하는지 확인", () => {
    cy.visit("/"); // 로컬 서버 주소로 변경 필요
    cy.contains("Hello, World!").should("be.visible");
  });
});
