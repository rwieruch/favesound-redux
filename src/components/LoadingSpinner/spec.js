import LoadingSpinner from './index';
import { shallow } from 'enzyme';

describe('InfoList', () => {

  const props = {
    isLoading: true
  };

  it('renders', () => {
    const element = shallow(<LoadingSpinner { ...props } />);
    expect(element.find('i')).to.have.length(1);
  });

  it('does not render when not loading', () => {
    props.isLoading = false;
    const element = shallow(<LoadingSpinner { ...props } />);
    expect(element.find('i')).to.have.length(0);
  });

});