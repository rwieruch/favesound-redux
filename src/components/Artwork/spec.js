import Artwork from './index';
import { shallow } from 'enzyme';

describe('Artwork', () => {

  const props = {
    image: '/foo',
    title: 'Foo',
    optionalImage: '/bar',
    size: 20
  };

  it('renders', () => {
    const element = shallow(<Artwork { ...props } />);

    expect(element.find('img')).to.have.length(1);
    expect(element.find('img').prop('src')).to.equal(props.image);
    expect(element.find('img').prop('alt')).to.equal(props.title);
    expect(element.find('img').prop('height')).to.equal(props.size);
    expect(element.find('img').prop('width')).to.equal(props.size);
  });

  it('takes an optional image into account', () => {
    props.image = null;
    const element = shallow(<Artwork { ...props } />);
    expect(element.find('img').prop('src')).to.equal(props.optionalImage);
  });

});
