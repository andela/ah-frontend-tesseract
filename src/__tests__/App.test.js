import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

import Enzyme,  {shallow}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  let mountedApp = shallow(<App />)
});
