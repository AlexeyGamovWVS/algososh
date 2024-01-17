import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
describe('Проверка очереди', () => {
  const queue = ['ava', 'pava', 'r2d2'];
  const CIRCLE = 'div[class*="circle_circle"]';
  const CIRCLE_STYLES = {
    default: '4px solid rgb(0, 50, 255)',
    changing: '4px solid rgb(210, 82, 225)',
    modified: '4px solid rgb(127, 224, 81)',
  };
  before(() => {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
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

  it('Правильность добавления элемента в очередь. Необходимо убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно. Не забудьте проверить, что курсоры head и tail отрисовываются корректно.', () => {
    queue.forEach((item, index) => {
      cy.get('input').type(item);
      cy.get('@addBtn').click();

      cy.get(CIRCLE)
        .should('have.length', 7)
        .each((circleItem, circleIndex) => {
          if (circleIndex === 0) {
            cy.wrap(circleItem).siblings().contains('head');
          }
          if (circleIndex === index) {
            cy.wrap(circleItem)
              .should('have.text', queue[circleIndex])
              .and('have.css', 'border', CIRCLE_STYLES.changing)
              .siblings()
              .contains('tail');
          }
          if (circleIndex < index && index - 1 >= 0) {
            cy.wrap(circleItem)
              .should('have.text', queue[circleIndex])
              .and('have.css', 'border', CIRCLE_STYLES.default);
          }

          if (circleIndex > index) {
            cy.wrap(circleItem)
              .should('have.text', '')
              .and('have.css', 'border', CIRCLE_STYLES.default);
          }
        });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE).each((circleItem, circleIndex) => {
        if (circleIndex <= index)
          cy.wrap(circleItem)
            .should('have.text', queue[circleIndex])
            .and('have.css', 'border', CIRCLE_STYLES.default);
        else
          cy.wrap(circleItem)
            .should('have.text', '')
            .and('have.css', 'border', CIRCLE_STYLES.default);
      });
    });
  });

  it('Проверить правильность удаления элемента из очереди', () => {
    queue.forEach((item) => cy.get('input').type(item));
    cy.get('@delBtn').click();
    cy.get(CIRCLE)
      .should('have.length', 7)
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.changing)
            .siblings()
            .contains('head');
        }
        if (index > 0 && index < queue.length - 1) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head');
        }

        if (index === queue.length - 1) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head')
            .and('contain', 'tail');
        }

        if (index >= queue.length) {
          cy.wrap(item)
            .should('have.text', '')
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head')
            .and('not.contain', 'tail');
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE)
      .should('have.length', 7)
      .each((item, index) => {
        if (index === 0) {
          cy.wrap(item)
            .should('have.text', '')
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head')
            .and('not.contain', 'tail');
        }
        if (index > 1 && index < queue.length - 1) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head')
            .and('not.contain', 'tail');
        }
        if (index === 1) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .contains('head');
        }

        if (index === queue.length - 1) {
          cy.wrap(item)
            .should('have.text', queue[index])
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .contains('tail');
        }

        if (index >= queue.length) {
          cy.wrap(item)
            .should('have.text', '')
            .and('have.css', 'border', CIRCLE_STYLES.default)
            .siblings()
            .should('not.contain', 'head')
            .and('not.contain', 'tail');
        }
      });
  });

  it('Проверьте поведение кнопки «Очистить». Добавьте в очередь несколько элементов, по нажатию на кнопку «Очистить» длина очереди должна быть равна 0.', () => {
    queue.forEach((item) => cy.get('input').type(item));
    cy.get('@resetBtn').click();
    cy.get(CIRCLE)
      .should('have.length', 7)
      .each((item, index) => {
        cy.wrap(item)
          .should('have.text', '')
          .and('have.css', 'border', CIRCLE_STYLES.default)
          .siblings()
          .should('not.contain', 'head')
          .and('not.contain', 'tail');
      });
    cy.get('@addBtn').should('be.disabled');
  });
});
