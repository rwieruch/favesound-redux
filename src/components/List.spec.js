import { List, NextButton, Chevron, SpecificList } from './List';
import { shallow } from 'enzyme';

describe('List', () => {

  let props;

  beforeEach(() => {
    props = {
      ids: [1, 2, 3, 4, 7],
      isExpanded: false,
      title: 'Foo',
      kind: 'Any',
      requestInProcess: false,
      entities: { 1: { name: 'x' }, 2: { name: 'y' } },
      toggleMore: () => {},
      nextHref: '/foo',
      fetchMore: () => {}
    };
  });

  it('renders', () => {
    const element = shallow(<List { ...props } />);
    expect(element.find('.list')).to.have.length(1);

    expect(element.find('.more-visible')).to.have.length(0);
  });

  it('shows expanded content', () => {
    props.isExpanded = true;
    const element = shallow(<List { ...props } />);
    expect(element.find('.more-visible')).to.have.length(1);
  });

  it('shows a title', () => {
    const element = shallow(<List { ...props } />);
    expect(element.find('button.inline').text()).to.contain(props.title);
  });

});

describe('Chevron', () => {

  let props;

  beforeEach(() => {
    props = {
      ids: [1, 2, 4, 6, 7],
      isExpanded: false
    };
  });

  it('renders', () => {
    const element = shallow(<Chevron { ...props } />);
    expect(element.find('i')).to.have.length(1);
  });

  it('does not render, when there are less ids', () => {
    props.ids = [1, 2, 3];
    const element = shallow(<Chevron { ...props } />);
    expect(element.find('i')).to.have.length(0);
  });

});

describe('NextButton', () => {

  let props;

  beforeEach(() => {
    props = {
      nextHref: '/foo',
      fetchMore: () => {},
      requestInProcess: false,
      isExpanded: true
    };
  });

  it('renders, when list is expanded and there is a next link', () => {
    const element = shallow(<NextButton { ...props } />);
    expect(element.find('button')).to.have.length(1);
  });

  it('does not render, when list is collapsed', () => {
    props.isExpanded = false;
    const element = shallow(<NextButton { ...props } />);
    expect(element.find('button')).to.have.length(0);
  });

  it('does not render, when there is no next link', () => {
    props.nextHref = null;
    const element = shallow(<NextButton { ...props } />);
    expect(element.find('button')).to.have.length(0);
  });

  it('renders a loading spinner instead, when request is in process', () => {
    props.requestInProcess = true;
    const element = shallow(<NextButton { ...props } />);
    expect(element.find('LoadingSpinner')).to.have.length(1);
  });

  it('initiates a callback on click', () => {

  });

});

describe('SpecificList', () => {

  let props;

  beforeEach(() => {
    props = {
      ids: [1, 2, 4, 6, 7],
      kind: 'USER',
      requestInProcess: false,
      entities: { 1: { name: 'x' }, 2: { name: 'y' } },
    };
  });

  it('renders specific item user according to length of ids', () => {
    props.kind = 'USER';
    const element = shallow(<SpecificList { ...props } />);
    expect(element.find('SpecificItemUser')).to.have.length(5);
  });

  it('renders specific item track according to length of ids', () => {
    props.kind = 'TRACK';
    const element = shallow(<SpecificList { ...props } />);
    expect(element.find('SpecificItemTrack')).to.have.length(5);
  });

  it('renders a loading spinner when there are no ids', () => {
    props.ids = null;
    const element = shallow(<SpecificList { ...props } />);
    expect(element.find('LoadingSpinner')).to.have.length(1);
    expect(element.find('SpecificItemTrack')).to.have.length(0);
    expect(element.find('SpecificItemUser')).to.have.length(0);
  });

});
