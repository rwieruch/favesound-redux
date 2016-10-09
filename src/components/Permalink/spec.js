import Permalink from './index';
import { shallow } from 'enzyme';

describe('Permalink', () => {

  it('renders', () => {
    const props = { text: 'Foo', link: '/bar' };
    const element = shallow(<Permalink { ...props } />);

    expect(element.find('a')).to.have.length(1);
    expect(element.find('a').prop('href')).to.equal(props.link);
    expect(element.find('a').text()).to.contain(props.text);
  });

});
