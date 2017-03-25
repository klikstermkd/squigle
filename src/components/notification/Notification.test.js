import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Notification from './Notification';

describe('<Notification />', () => {
  it('renders the component without crashing', () => {
    shallow(<Notification />);
  });

  it('checks the content of a rendered notification', () => {
    const props = {
      header: 'test header',
      body: 'test body',
      category: 'info'
    };
    const wrapper = shallow(<Notification {...props} />);

    expect(wrapper.find('.alert-info')).toBeDefined();
    expect(wrapper.find('.alert-header').text()).toBe(props.header);
    expect(wrapper.find('.alert-body').text()).toBe(props.body);
  });

  it('checks is handleNotifClick called on notification click', () => {
    const handleNotifClick = jest.fn();
    const wrapper = mount(<Notification handleNotifClick={handleNotifClick} />);

    wrapper.find('.alert').simulate('click');

    expect(handleNotifClick).toHaveBeenCalled();
  });

  it('checks is handleCloseNotifClick called on close button click', () => {
    const handleCloseNotifClick = jest.fn();
    const handleNotifClick = jest.fn();
    const wrapper = mount(<Notification handleCloseNotifClick={handleCloseNotifClick} handleNotifClick={handleNotifClick} />);

    wrapper.find('.close').simulate('click');

    expect(handleCloseNotifClick).toHaveBeenCalled();
  });

  it('changes body text on group notification click', () => {
    let hasClicked = false;

    const handleCloseNotifClick = jest.fn();

    const handleNotifClick = jest.fn((event, type) => {
      const body = hasClicked ? 'Click to expand.' : 'Click to collapse.';

      wrapper.setProps({body});
      hasClicked = !hasClicked;
    });

    const wrapper = mount(
      <Notification
        body="Click to expand."
        handleCloseNotifClick={handleCloseNotifClick}
        handleNotifClick={handleNotifClick}
        type="group" />
    );

    wrapper.find('.alert').simulate('click');
    expect(wrapper.find('.alert-body').text()).toBe('Click to collapse.');

    wrapper.find('.alert').simulate('click');
    expect(wrapper.find('.alert-body').text()).toBe('Click to expand.');
  });

  it('calls componentDidMount', () => {
    Notification.prototype.componentDidMount = jest.fn();

    const wrapper = mount(<Notification />);

    expect(Notification.prototype.componentDidMount).toHaveBeenCalled();
  });

  it('calls componentWillUnmount', () => {
    Notification.prototype.componentWillUnmount = jest.fn();

    const wrapper = mount(<Notification />);

    wrapper.unmount();

    expect(Notification.prototype.componentWillUnmount).toHaveBeenCalled();
  });
});
