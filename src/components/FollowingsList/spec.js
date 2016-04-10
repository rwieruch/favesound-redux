import { FollowingsList } from './index';
import { shallow } from 'enzyme';

describe('FollowingsList', () => {

  const props = {
    currentUser: { name: 'x' },
    userEntities: { 1: { name: 'x' }, 2: { name: 'y' } },
    followings: [1],
    nextHref: '/foo',
    requestInProcess: false,
    isExpanded: false,
    setToggle: () => {},
    fetchFollowings: () => {}
  };

  it('renders', () => {
    const element = shallow(<FollowingsList { ...props } />);
    expect(element.find('List')).to.have.length(1);
  });

});
