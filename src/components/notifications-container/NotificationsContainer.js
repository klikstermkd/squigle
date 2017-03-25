import React from 'react';
import {v4 as uuidV4} from 'uuid';

import Notification from '../notification/Notification';

import './NotificationsContainer.css';

class NotificationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      showGroupedNotifications: false,
      groupedNotification: {
        body: 'Click to expand.',
        category: 'success',
        id: uuidV4()
      }
    }

    this.handleCloseNotifClick = this.handleCloseNotifClick.bind(this);
    this.handleNotifClick = this.handleNotifClick.bind(this);
  }

  addNotification(notification) {
    if (typeof notification.id === 'undefined') {
      notification.id = uuidV4();
    }

    this.setState(prevState => {
      return {notifications: [...prevState.notifications, notification]};
    });

    return notification;
  }

  closeNotification(id) {
    this.setState(prevState => {
      const notifications = prevState.notifications.filter(item => item.id !== id);
      const newState = {notifications: notifications};

      // Hide the grouped notification if there are less than 6 notifications.
      if (notifications.length < 6) {
        newState.showGroupedNotifications = false;
      }

      return newState;
    });
  }

  closeAllNotifications() {
    this.setState({notifications: [], showGroupedNotifications: false});
  }

  handleCloseNotifClick(type, id) {
    if (type === 'single') {
      this.closeNotification(id);
    } else {
      this.setState(prevState => {

        // Take only the last 5 notifications.
        const notifications = prevState.notifications.slice(-5);

        const newState = {notifications: notifications};

        // Hide the grouped notification if there are less than 6 notifications.
        if (notifications.length < 6) {
          newState.showGroupedNotifications = false;
        }

        return newState;
      });
    }
  }

  handleNotifClick(event, type) {

    // Show/hide grouped notifications.
    if (type === 'group' && event.target.className !== 'close-icon') {
      this.setState(prevState => {
        let body = '';

        if (prevState.showGroupedNotifications) {
          body = 'Click to expand.';
        } else {
          body = 'Click to collapse.';
        }

        return {
          groupedNotification: {...prevState.groupedNotification, body: body},
          showGroupedNotifications: !prevState.showGroupedNotifications
        }
      });
    }
  }

  render() {
    const totalNotifications = this.state.notifications.length;

    let visibleNotifications = [];
    let groupedNotifications = [];
    let groupedNotificationHeader = null;
    let dimNotification = false;

    if (totalNotifications > 5) {

      // Extract the last 5 notifications.
      visibleNotifications = this.state.notifications.slice(-5);

      // Extract the remaining older notifications.
      groupedNotifications = this.state.notifications.slice(0, totalNotifications - 5);

      const verb = groupedNotifications.length > 1 ? 'are' : 'is';
      const singPlural = groupedNotifications.length > 1 ? 'notifications' : 'notification';

      groupedNotificationHeader = `There ${verb} ${groupedNotifications.length} older ${singPlural}.`
    } else {
      visibleNotifications = this.state.notifications;
    }

    // Dim visible notifications when the grouped notification is expanded.
    if (this.state.showGroupedNotifications && groupedNotifications.length > 0) {
      dimNotification = true;
    }

    return (
      <div className="notifications-container">

        {/* Display grouped notification. */}
        {groupedNotifications.length > 0 &&
          <Notification
            header={groupedNotificationHeader}
            body={this.state.groupedNotification.body}
            category={this.state.groupedNotification.category}
            type="group"
            id={this.state.groupedNotification.id}
            handleNotifClick={this.handleNotifClick}
            handleCloseNotifClick={this.handleCloseNotifClick} />
        }

        {/* Display grouped notifications. */}
        {this.state.showGroupedNotifications &&
          <div className="notifications-container-grouped">
            {groupedNotifications.map(item => {
              return (
                <Notification
                  header={item.header}
                  body={item.body}
                  category={item.category}
                  handleCloseNotifClick={this.handleCloseNotifClick}
                  handleNotifClick={this.handleNotifClick}
                  type="single"
                  stacked={true}
                  id={item.id}
                  key={item.id} />
              )
            })}
          </div>
        }

        {/* Display visible notifications. */}
        {visibleNotifications.map(item => {
          return (
            <Notification
              header={item.header}
              body={item.body}
              category={item.category}
              handleCloseNotifClick={this.handleCloseNotifClick}
              handleNotifClick={this.handleNotifClick}
              dim={dimNotification}
              type="single"
              id={item.id}
              key={item.id} />
          )
        })}
      </div>
    )
  }
}

export default NotificationsContainer;
