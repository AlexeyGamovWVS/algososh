import { DELAY_IN_MS } from '../../src/constants/delays';
import { CIRCLE, CIRCLE_CONTENT, CIRCLE_SMALL, CIRCLE_STYLES } from './utils';
describe('Проверка связного списка', () => {
  before(() => {
    cy.visit('list');
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
      .each((item) => {
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
      .find(CIRCLE_SMALL)
      .should('have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE)
      .first()
      .should('have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.modified)
      .siblings()
      .contains('head');
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE)
      .first()
      .should('have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.default);
  });

  it('Проверка добавления элемента в tail.', () => {
    cy.get('@valueInput').type('r3d2');
    cy.get('@addTailBtn').click();
    cy.get(CIRCLE_CONTENT)
      .last()
      .find(CIRCLE_SMALL)
      .should('have.text', 'r3d2')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE)
      .last()
      .should('have.text', 'r3d2')
      .and('have.css', 'border', CIRCLE_STYLES.modified)
      .siblings()
      .contains('tail');
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE)
      .last()
      .should('have.text', 'r3d2')
      .and('have.css', 'border', CIRCLE_STYLES.default);
  });

  it('Проверка добавления элемента по индексу.', () => {
    cy.get('@valueInput').type('rInx');
    cy.get('@indexInput').type('2');
    cy.get('@addIndxBtn').click();

    cy.get(CIRCLE_CONTENT)
      .first()
      .find(CIRCLE_SMALL)
      .should('have.text', 'rInx')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.get(CIRCLE_CONTENT)
      .first()
      .find(CIRCLE)
      .last()
      .should('have.css', 'border', CIRCLE_STYLES.changing);

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT)
      .eq(1)
      .find(CIRCLE_SMALL)
      .should('have.text', 'rInx')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.get(CIRCLE_CONTENT)
      .eq(1)
      .find(CIRCLE)
      .last()
      .should('have.css', 'border', CIRCLE_STYLES.changing);

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT)
      .eq(2)
      .find(CIRCLE_SMALL)
      .should('have.text', 'rInx')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.get(CIRCLE_CONTENT)
      .eq(2)
      .find(CIRCLE)
      .last()
      .should('have.css', 'border', CIRCLE_STYLES.default);

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE).eq(2).should('have.css', 'border', CIRCLE_STYLES.modified).contains('rInx');

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE).each((item) => {
      cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.default);
    });
  });

  it('Проверка удаления элемента из head.', () => {
    cy.get('@rmHeadBtn').click();
    cy.get(CIRCLE_CONTENT)
      .first()
      .find(CIRCLE_SMALL)
      .should('have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.get(CIRCLE_CONTENT)
      .first()
      .find(CIRCLE)
      .first()
      .should('not.have.text', 'r2d2')
      .and('have.css', 'border', CIRCLE_STYLES.default);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).first().should('not.have.text', 'r2d2');
  });

  it('Проверка удаления элемента из tail.', () => {
    cy.get('@rmTailBtn').click();
    cy.get(CIRCLE_CONTENT)
      .last()
      .find(CIRCLE_SMALL)
      .should('have.text', 'r3d2')
      .and('have.css', 'border', CIRCLE_STYLES.changing);
    cy.get(CIRCLE_CONTENT)
      .last()
      .find(CIRCLE)
      .first()
      .should('not.have.text', 'r3d2')
      .and('have.css', 'border', CIRCLE_STYLES.default);
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE).last().should('not.have.text', 'r3d2');
  });

  it('Проверка удаления элемента по индексу.', () => {
    cy.get('@valueInput').type('Star');
    cy.get('@addHeadBtn').click();

    cy.get('@indexInput').type('2');
    cy.get('@rmIndxBtn').click();

    cy.get(CIRCLE).each((item, index) => {
      index === 0
        ? cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.changing)
        : cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.default);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE).each((item, index) => {
      index === 0 || index === 1
        ? cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.changing)
        : cy.wrap(item).should('have.css', 'border', CIRCLE_STYLES.default);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(CIRCLE_CONTENT)
      .eq(2)
      .find(CIRCLE_SMALL)
      .should('have.css', 'border', CIRCLE_STYLES.changing)
      .and('have.text', 'rInx');
    cy.get(CIRCLE_CONTENT)
      .eq(2)
      .find(CIRCLE)
      .first()
      .should('have.css', 'border', CIRCLE_STYLES.default)
      .and('not.have.text', 'rInx');
    cy.wait(DELAY_IN_MS);
    cy.get(CIRCLE)
      .eq(2)
      .should('have.css', 'border', CIRCLE_STYLES.default)
      .and('not.have.text', 'rInx');
  });
});
