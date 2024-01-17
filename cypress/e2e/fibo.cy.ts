import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Проверка фибоначи', () => {
  const FIB_ARRAY = [0, 1, 1, 2, 3, 5, 8, 13, 21]; //10
  const CIRCLE = 'div[class*="circle_circle"]';
  before(() => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  beforeEach(() => {
    cy.contains('Рассчитать').as('button');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('@button').should('be.disabled');
    cy.get('input').type('3');
    cy.get('@button').should('not.be.disabled');
    cy.get('input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('Числа генерируются корректно', () => {
    cy.get('input').type('10');
    cy.get('@button').click();

    cy.get(CIRCLE, { timeout: SHORT_DELAY_IN_MS * (FIB_ARRAY.length + 1) })
      .as('circles')
      .should('have.length', FIB_ARRAY.length)
      .each((item, index) => {
        expect(item).to.contain(`${FIB_ARRAY[index]}`);
      });
  });
});
