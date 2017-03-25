import React from 'react';

import NotificationsContainer from '../notifications-container/NotificationsContainer';
import FormContainer from '../form-container/FormContainer';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.closeAllNotifications = this.closeAllNotifications.bind(this);
  }

  handleFormSubmit(formState) {
    const { body, header, category } = formState;
    const notification = {body, header, category};

    this.notificationsContainer.addNotification(notification);
  }

  closeAllNotifications() {
    this.notificationsContainer.closeAllNotifications();
  }

  render() {
    return (
      <div>
        <FormContainer handleFormSubmit={this.handleFormSubmit} />
        <button className="close-all-notifications" onClick={this.closeAllNotifications}>Close all notifications</button>
        <NotificationsContainer ref={comp => this.notificationsContainer = comp} />
      </div>
    )
  }
}

export default App;
