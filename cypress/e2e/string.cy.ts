import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
describe('Проверка строки', () => {
  const STRING = 'ROVAAM';
  const CIRCLE = 'div[class*="circle_circle"]';
  const CIRCLE_STYLES = {
    default: '4px solid rgb(0, 50, 255)',
    changing: '4px solid rgb(210, 82, 225)',
    modified: '4px solid rgb(127, 224, 81)',
  };
  before(function () {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
  });

  it('Кнопка должна блокироваться при пустом инпуте', () => {
    cy.contains('Развернуть').as('button');
    cy.get('@button').should('be.disabled');
    cy.get('input').type('hello');
    cy.get('@button').should('not.be.disabled');
    cy.get('input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('Проверка корректности стилей и разворота строки', () => {
    cy.contains('Развернуть').as('button');
    cy.get('input').type(STRING);
    cy.get('@button').click();

    cy.get(CIRCLE)
      .as('circles')
      .should('have.length', STRING.length)
      .each((circleItem, index) => {
        switch (index) {
          case 0:
            cy.wrap(circleItem)
              .should('have.text', STRING[index])
              .and('have.css', 'border', CIRCLE_STYLES.changing);
            break;
          case STRING.length - 1:
            cy.wrap(circleItem)
              .should('have.text', STRING[index])
              .and('have.css', 'border', CIRCLE_STYLES.changing);
            break;
          default:
            cy.wrap(circleItem)
              .should('have.text', STRING[index])
              .and('have.css', 'border', CIRCLE_STYLES.default);
            break;
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').each((circeItem, index) => {
      switch (index) {
        case 0:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;
        case STRING.length - 1:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;

        case 1:
          cy.wrap(circeItem)
            .should('have.text', STRING[index])
            .and('have.css', 'border', CIRCLE_STYLES.changing);
          break;

        case STRING.length - 2:
          cy.wrap(circeItem)
            .should('have.text', STRING[index])
            .and('have.css', 'border', CIRCLE_STYLES.changing);
          break;

        default:
          cy.wrap(circeItem)
            .should('have.text', STRING[index])
            .and('have.css', 'border', CIRCLE_STYLES.default);
          break;
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').each((circeItem, index) => {
      switch (index) {
        case 0:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;
        case STRING.length - 1:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;

        case 1:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;

        case STRING.length - 2:
          cy.wrap(circeItem)
            .should('have.text', STRING[STRING.length - 1 - index])
            .and('have.css', 'border', CIRCLE_STYLES.modified);
          break;

        default:
          cy.wrap(circeItem)
            .should('have.text', STRING[index])
            .and('have.css', 'border', CIRCLE_STYLES.changing);
          break;
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circles').each((circeItem, index) => {
      cy.wrap(circeItem)
        .should('have.text', STRING[STRING.length - 1 - index])
        .and('have.css', 'border', CIRCLE_STYLES.modified);
    });
  });
});

/*
    i === 0
    index 0 — CI str[0] changing
    index 1 — CI str[1] def
    index 2 — CI str[2] def
    index 3 — CI str[3] def
    index 4 — CI str[4] def
    index 5 — CI str[5] changing

    CI [ i ] || [index === str.l - 1 - i ] = str [i] [index-i] changing
    else CI = str[index] def

    */
/*
    let i = 0;
    const stepsCount = Math.floor(STRING.length / 2) + 1;
    while (i < stepsCount) {
      cy.get(CIRCLE)
        .as('circles')
        .should('have.length', STRING.length)
        .each((circleItem, index) => {
          switch (i) {
            case 0:
              if (index === i || index === STRING.length - 1 - i) {
                cy.wrap(circleItem)
                  .should('have.text', STRING[index])
                  .and('have.css', 'border', CIRCLE_STYLES.changing);
              } else {
                cy.wrap(circleItem)
                  .should('have.text', STRING[index])
                  .and('have.css', 'border', CIRCLE_STYLES.default);
              }
              break;
            case stepsCount:
              cy.wrap(circleItem)
                .should('have.text', STRING[STRING.length - 1 - index])
                .and('have.css', 'border', CIRCLE_STYLES.modified);
              break;
            default:
              if (index === i - 1 || index === STRING.length - i) {
                cy.wrap(circleItem)
                  .should('have.text', STRING[STRING.length - 1 - index])
                  .and('have.css', 'border', CIRCLE_STYLES.modified);
              } else if (index === i || STRING.length - 1 - i) {
                cy.wrap(circleItem)
                  .should('have.text', STRING[index])
                  .and('have.css', 'border', CIRCLE_STYLES.changing);
              } else {
                cy.wrap(circleItem)
                  .should('have.text', STRING[index])
                  .and('have.css', 'border', CIRCLE_STYLES.default);
              }

              break;
          }
        });
      i++;
      // cy.wait(SHORT_DELAY_IN_MS);
    }
*/
/* i === 1

    index 0 — CI str[5] modified
    index 1 — CI str[1] changing
    index 2 — CI str[2] def
    index 3 — CI str[3] def
    index 4 — CI str[4] changing
    index 5 — CI str[0] modified

    CI [i - 1] || [index === str.l - i] = str [strl - 1 - index] modified
    CI [ i ] || [ str.l - 1 - i ] = str [i] [index-i] changing
    else CI = str[index] def

    i === 2

    index 0 — CI str[5] modified
    index 1 — CI str[4] modified
    index 2 — CI str[2] changing
    index 3 — CI str[3] changing
    index 4 — CI str[1] modified
    index 5 — CI str[0] modified

    CI [i - 1] || [index === str.l - i] = str [strl - 1 - index] modified
    CI [ i ] || [ str.l - 1 - i ] = str [i] [index-i] changing
    else CI = str[index] def

    i === 3 
    index 0 — CI str[5] modified
    index 1 — CI str[4] modified
    index 2 — CI str[3] modified
    index 3 — CI str[2] modified
    index 4 — CI str[1] modified
    index 5 — CI str[0] modified

    CI [i - 1] || [index === str.l - i] = str [strl - 1 - index] modified
    
    else CI = str[index] def
    */
