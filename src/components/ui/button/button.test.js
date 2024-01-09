import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './button';

const BTN_CONFIG = {
  btnText: 'clickMe',
  alertText: 'clicked',
};

describe('Компонент «кнопка»', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text={BTN_CONFIG.btnText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();
    render(<Button text={BTN_CONFIG.btnText} onClick={alert(BTN_CONFIG.alertText)} />);
    const btn = screen.getByText(BTN_CONFIG.btnText);
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith(BTN_CONFIG.alertText);
  });
});
