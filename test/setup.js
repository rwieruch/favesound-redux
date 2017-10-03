import React from 'react'; // eslint-disable-line no-unused-vars
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { jsdom } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'browser' };

global.React = React;
global.expect = expect;

global.fdescribe = (...args) => describe.only(...args);
global.fit = (...args) => it.only(...args);
