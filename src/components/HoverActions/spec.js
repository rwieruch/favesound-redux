import Actions, { Action } from './index';
import { shallow } from 'enzyme';

describe('Actions', () => {

  const props = {
    configuration: [
      { fn: () => {}, className: 'foo' },
      { fn: () => {}, className: 'bar' },
    ],
    isVisible: true
  };

  it('renders', () => {
    const element = shallow(<Actions { ...props } />);
    expect(element.find('.action')).to.have.length(1);
  });

  it('renders action item according to configuration length', () => {
    const element = shallow(<Actions { ...props } />);
    expect(element.find('Action')).to.have.length(2);
  });

  it('is visible, when it is set to visible ', () => {
    props.isVisible = true;
    const element = shallow(<Actions { ...props } />);
    expect(element.find('.action').prop('className')).to.equal('action action-visible');
  });

  it('is invisible, when it is set to invisible ', () => {
    props.isVisible = false;
    const element = shallow(<Actions { ...props } />);
    expect(element.find('.action').prop('className')).to.equal('action');
  });

});

describe('Action', () => {

  const props = {
    actionItem: { fn: () => {}, className: 'foo' }
  };

  it('renders', () => {
    const element = shallow(<Action { ...props } />);
    expect(element.find('.action-item')).to.have.length(1);
  });

  it('shows proper className', () => {
    const element = shallow(<Action { ...props } />);
    expect(element.find('i').prop('className')).to.equal(props.actionItem.className);
  });

});