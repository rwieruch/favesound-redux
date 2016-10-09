import InfoList, { InfoItem } from './index';
import { shallow } from 'enzyme';

describe('InfoList', () => {

  const props = {
    information: [
      { count: 1, className: 'foo' },
      { count: 2, className: 'bar' },
    ]
  };

  it('renders', () => {
    const element = shallow(<InfoList { ...props } />);
    expect(element.find('.info-list')).to.have.length(1);
  });

  it('renders info item according to information length', () => {
    const element = shallow(<InfoList { ...props } />);
    expect(element.find('InfoItem')).to.have.length(2);
  });

});

describe('InfoItem', () => {

  const props = {
    infoItem: { count: 1, className: 'foo' }
  };

  it('renders', () => {
    const element = shallow(<InfoItem { ...props } />);
    expect(element.find('.info-list-item')).to.have.length(1);
  });

  it('shows proper className and count', () => {
    const element = shallow(<InfoItem { ...props } />);
    expect(element.find('i').prop('className')).to.equal(props.infoItem.className);
    expect(element.find('.info-list-item').text()).to.contain(props.infoItem.count);
  });

});