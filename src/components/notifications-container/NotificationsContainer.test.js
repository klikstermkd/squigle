import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import NotificationsContainer from '../notifications-container/NotificationsContainer';
import Notification from '../notification/Notification';

describe('<NotificationsContainer />', () => {
  it('renders the component without crashing', () => {
    shallow(<NotificationsContainer />);
  });

  it('adds new notification', () => {
    const wrapper = shallow(<NotificationsContainer />);

    const notification = {
      header: 'test',
      body: 'test',
      category: 'test'
    };

    wrapper.instance().addNotification(notification);

    expect(wrapper.find(Notification)).toHaveLength(1);
  });

  it('closes programatically a notification', () => {
    const wrapper = shallow(<NotificationsContainer />);

    const notification = {
      header: 'test',
      body: 'test',
      category: 'test'
    };

    const { id } = wrapper.instance().addNotification(notification);

    expect(wrapper.find(Notification)).toHaveLength(1);

    wrapper.instance().closeNotification(id);

    expect(wrapper.find(Notification)).toHaveLength(0);
  });

  it('closes all notifications', () => {
    const wrapper = mount(<NotificationsContainer />);

    for (let i = 0; i < 5; i++) {
      const notification = {
        header: 'test',
        body: 'test',
        category: 'test'
      };

      wrapper.instance().addNotification(notification);
    }

    expect(wrapper.find(Notification)).toHaveLength(5);

    wrapper.instance().closeAllNotifications();

    expect(wrapper.find(Notification)).toHaveLength(0);
  });
});
