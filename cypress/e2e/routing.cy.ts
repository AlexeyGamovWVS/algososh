const PAGES = [
  { name: 'Строка', url: '/recursion' },
  { name: 'Фибоначчи', url: '/fibonacci' },
  { name: 'Сортировка', url: '/sorting' },
  { name: 'Стек', url: '/stack' },
  { name: 'Очередь', url: '/queue' },
  { name: 'Связный список', url: '/list' },
];

describe('app works correctly with routes', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Должна открыться главная', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  PAGES.forEach((page) => {
    it(`Должна открыться страница ${page.name}`, () => {
      cy.get(`a[href*='${page.url}']`).click();
      cy.contains(`${page.name}`);
      cy.get('button').contains('К оглавлению').click();
      cy.contains('МБОУ АЛГОСОШ');
    });
  });
});
