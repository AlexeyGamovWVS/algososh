import { DELAY_IN_MS } from '../../src/constants/delays';
describe('Проверка связного списка', () => {
  const CIRCLE = 'div[class*="circle_circle"]';
  const CIRCLE_SMALL = 'div[class*="circle_small"]';
  const CIRCLE_CONTENT = 'li[data-cy*="circle"]';
  const CIRCLE_STYLES = {
    default: '4px solid rgb(0, 50, 255)',
    changing: '4px solid rgb(210, 82, 225)',
    modified: '4px solid rgb(127, 224, 81)',
  };
  before(() => {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
  });

  beforeEach(() => {
    cy.contains('Добавить в Head').as('addHeadBtn');
    cy.contains('Добавить в Tail').as('addTailBtn');
    cy.contains('Удалить из Head').as('rmHeadBtn');
    cy.contains('Удалить из Tail').as('rmTailBtn');
    cy.contains('Добавить по индексу').as('addIndxBtn');
    cy.contains('Удалить по индексу').as('rmIndxBtn');
    cy.get('input[name="stringInput"]').as('valueInput');
    cy.get('input[name="inInput"]').as('indexInput');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже.', () => {
    cy.get('@addHeadBtn').should('be.disabled');
    cy.get('@addTailBtn').should('be.disabled');
    cy.get('@addIndxBtn').should('be.disabled');
    cy.get('@rmIndxBtn').should('be.disabled');
    cy.get('@rmHeadBtn').should('not.be.disabled');
    cy.get('@rmTailBtn').should('not.be.disabled');

    cy.get('@valueInput').type('r2d2');

    cy.get('@addHeadBtn').should('not.be.disabled');
    cy.get('@addTailBtn').should('not.be.disabled');
    cy.get('@addIndxBtn').should('be.disabled');
    cy.get('@rmIndxBtn').should('be.disabled');

    cy.get('@indexInput').type('2');

    cy.get('@addIndxBtn').should('not.be.disabled');
    cy.get('@rmIndxBtn').should('not.be.disabled');

    cy.get('@valueInput').clear();

    cy.get('@addHeadBtn').should('be.disabled');
    cy.get('@addTailBtn').should('be.disabled');
    cy.get('@addIndxBtn').should('be.disabled');
    cy.get('@rmIndxBtn').should('not.be.disabled');

    cy.get('@indexInput').clear();
    cy.get('@addHeadBtn').should('be.disabled');
    cy.get('@addTailBtn').should('be.disabled');
    cy.get('@addIndxBtn').should('be.disabled');
    cy.get('@rmIndxBtn').should('be.disabled');
  });

  it('Проверка отрисовки дефолтного списка.', () => {
    cy.get(CIRCLE)
      .should('have.length.gte', 3)
      .and('have.length.lte', 4)
      .each((item, index) => {
        cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.default);
      });
    cy.get(CIRCLE).first().siblings().contains('head');
    cy.get(CIRCLE).last().siblings().contains('tail');
  });

  it('Проверка добавления элемента в head.', () => {
    cy.get('@valueInput').type('r2d2');
    cy.get('@addHeadBtn').click();
    cy.get(CIRCLE_CONTENT)
      .first()
      .get(CIRCLE_SMALL)
      .should('have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    //   .should('have.css', CIRCLE_STYLES.changing);
    // cy.wait(DELAY_IN_MS);
    // cy.get(CIRCLE).first().should('have.text', )
    // cy.get(CIRCLE).eq(0).contains('r2d2').should('have.css', CIRCLE_STYLES.modified);
  });
  it('Проверка добавления элемента в tail.', () => {});
  it('Проверка добавления элемента по индексу.', () => {});
  it('Проверка удаления элемента из head.', () => {});
  it('Проверка удаления элемента из tail.', () => {});
  it('Проверка удаления элемента по индексу.', () => {});
});
