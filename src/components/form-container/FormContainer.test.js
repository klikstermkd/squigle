import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import FormContainer from './FormContainer';

describe('<FormContainer />', () => {
  it('renders the component without crashing', () => {
    shallow(<FormContainer />);
  });

  it('checks is handleFormSubmit called on button click', () => {
    const handleFormSubmit = jest.fn();
    const wrapper = shallow(<FormContainer handleFormSubmit={handleFormSubmit} />);
    const event = {
      preventDefault: () => {}
    };

    wrapper.instance().form = {
      checkValidity: () => true
    };

    wrapper.find('button').simulate('click', event);

    expect(handleFormSubmit).toHaveBeenCalled();
  });

  it('checks input change on header, body and category', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<FormContainer />);
    let event = {
      target: {
        value: 'test',
        id: 'header'
      }
    };

    wrapper.find('#header').simulate('change', event);
    expect(wrapper.state().header).toBe('test');

    event.target.id = 'body';

    wrapper.find('#body').simulate('change', event);
    expect(wrapper.state().body).toBe('test');

    event.target.id = 'category';
    event.target.value = 'warning';

    wrapper.find('#category').simulate('change', event);
    expect(wrapper.state().category).toBe('warning');
  });
});
