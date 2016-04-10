import { FollowersList } from './index';
import { shallow } from 'enzyme';

describe('FollowersList', () => {

  const props = {
    currentUser: { name: 'x' },
    userEntities: { 1: { name: 'x' }, 2: { name: 'y' } },
    followers: [1],
    nextHref: '/foo',
    requestInProcess: false,
    isExpanded: false,
    setToggle: () => {},
    fetchFollowers: () => {}
  };

  it('renders', () => {
    const element = shallow(<FollowersList { ...props } />);
    expect(element.find('List')).to.have.length(1);
  });

});
