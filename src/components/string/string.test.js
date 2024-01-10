import { getReverseStringsOnEachStep } from './utils';

describe('Строка', () => {
  const chet = '1234';
  const nechet = '123';
  const one = 'r';
  const empty = '';

  it('Корректно разворачивает строку с чётным количеством символов', () => {
    expect(
      getReverseStringsOnEachStep(chet)[getReverseStringsOnEachStep(chet).length - 1].toString()
    ).toBe('4,3,2,1');
  });

  it('Корректно разворачивает строку с нечётным количеством символов', () => {
    expect(
      getReverseStringsOnEachStep(nechet)[getReverseStringsOnEachStep(nechet).length - 1].toString()
    ).toBe('3,2,1');
  });

  it('Корректно разворачивает строку с 1 символом', () => {
    expect(
      getReverseStringsOnEachStep(one)[getReverseStringsOnEachStep(one).length - 1].toString()
    ).toBe('r');
  });

  it('Корректно разворачивает пустую строку', () => {
    expect(getReverseStringsOnEachStep(empty)[0].toString()).toBe('');
  });
});
