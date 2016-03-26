import React from 'react'; // eslint-disable-line no-unused-vars
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { jsdom } from 'jsdom';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'browser' };

global.React = React;
global.expect = expect;

global.fdescribe = (...args) => describe.only(...args);
global.fit = (...args) => it.only(...args);
