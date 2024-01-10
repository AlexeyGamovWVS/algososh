import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

const CIRCLE_CONFIG = {
  text: 'CI',
  states: ElementStates,
  index: 1,
};

describe('Компонент circle', () => {
  it('Circle без буквы', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с буквами', () => {
    const tree = renderer.create(<Circle letter={CIRCLE_CONFIG.text} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с head', () => {
    const tree = renderer.create(<Circle head={CIRCLE_CONFIG.text} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с tail', () => {
    const tree = renderer.create(<Circle tail={CIRCLE_CONFIG.text} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с index', () => {
    const tree = renderer.create(<Circle index={CIRCLE_CONFIG.index} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с пропом isSmall ===  true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  Object.values(CIRCLE_CONFIG.states).forEach((state) => {
    it(`Circle в состоянии ${state}`, () => {
      const tree = renderer.create(<Circle state={state} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
