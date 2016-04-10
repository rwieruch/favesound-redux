import { FavoritesList } from './index';
import { shallow } from 'enzyme';

describe('FavoritesList', () => {

  const props = {
    currentUser: { name: 'x' },
    trackEntities: { 1: { name: 'x' }, 2: { name: 'y' } },
    favorites: [1],
    nextHref: '/foo',
    requestInProcess: false,
    isExpanded: false,
    setToggle: () => {},
    fetchFavorites: () => {}
  };

  it('renders', () => {
    const element = shallow(<FavoritesList { ...props } />);
    expect(element.find('List')).to.have.length(1);
  });

});