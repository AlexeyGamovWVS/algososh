import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
describe('Проверка стека', () => {
  const STACK = ['ava', 'pava', 'r2d2'];
  const CIRCLE = 'div[class*="circle_circle"]';
  const CIRCLE_STYLES = {
    default: '4px solid rgb(0, 50, 255)',
    changing: '4px solid rgb(210, 82, 225)',
    modified: '4px solid rgb(127, 224, 81)',
  };
  before(() => {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });

  beforeEach(() => {
    cy.contains('Добавить').as('addBtn');
    cy.contains('Удалить').as('delBtn');
    cy.contains('Сбросить').as('resetBtn');
  });

  // Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.

  it('Если в инпуте пусто, то кнопка добавления недоступна.', () => {
    cy.get('@addBtn').should('be.disabled');
    cy.get('input').type('hell');
    cy.get('@addBtn').should('not.be.disabled');
    cy.get('input').clear();
    cy.get('@addBtn').should('be.disabled');
  });

  it('Правильность добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.', () => {
    STACK.forEach((item, index) => {
      cy.get('input').type(item); //stack1
      cy.get('@addBtn').click();

      cy.get(CIRCLE)
        .should('have.length', index + 1)
        .each((circleItem, circleIndex) => {
          circleIndex === index
            ? cy
                .wrap(circleItem)
                .should('have.text', STACK[circleIndex])
                .and('have.css', 'border', CIRCLE_STYLES.changing)
            : cy
                .wrap(circleItem)
                .should('have.text', STACK[circleIndex])
                .and('have.css', 'border', CIRCLE_STYLES.default);
        });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE).last().siblings().contains('top');
      cy.get(CIRCLE).each((circleItem, circleIndex) => {
        cy.wrap(circleItem)
          .should('have.text', STACK[circleIndex])
          .and('have.css', 'border', CIRCLE_STYLES.default);
      });
    });
  });

  it('Проверить правильность удаления элемента из стека', () => {
    STACK.forEach((item) => cy.get('input').type(item));
    cy.get('@delBtn').click();
    cy.get(CIRCLE)
      .should('have.length', STACK.length)
      .each((item, index) => {
        index === STACK.length - 1
          ? cy
              .wrap(item)
              .should('have.text', STACK[index])
              .and('have.css', 'border', CIRCLE_STYLES.changing)
          : cy
              .wrap(item)
              .should('have.text', STACK[index])
              .and('have.css', 'border', CIRCLE_STYLES.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE)
      .should('have.length', STACK.length - 1)
      .each((item, index) => {
        cy.wrap(item)
          .should('have.text', STACK[index])
          .and('have.css', 'border', CIRCLE_STYLES.default);
      });
  });

  it('Поведение кнопки «Очистить»', () => {
    STACK.forEach((item) => cy.get('input').type(item));
    cy.get('@resetBtn').click();
    cy.get(CIRCLE).should('not.exist');
    cy.get('@addBtn').should('be.disabled');
  });
});
