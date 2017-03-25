import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import NotificationsContainer from '../notifications-container/NotificationsContainer';
import FormContainer from '../form-container/FormContainer';

describe('<App />', () => {
  it('renders the entire app without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
  });

  it('renders only the App component without crashing', () => {
    shallow(<App />);
  });

  it('checks is FormContainer present in App', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<FormContainer />)).toBeTruthy();
  });

  it('checks is NotificationsContainer present in App', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<NotificationsContainer />)).toBeTruthy();
  });
});
