import React from 'react';

import './Notification.css';

class Notification extends React.Component {
  componentDidMount() {
    const {
      category,
      handleCloseNotifClick,
      id,
      type
    } = this.props;

    // Automatically close notification of category info after 90 seconds.
    if (category === 'info') {
      this.closeNotification = setTimeout(() => {
        handleCloseNotifClick(type, id);
      }, 90000);
    }
  }

  componentWillUnmount() {

    // Clear the timeout when notification is removed to prevent memory leak.
    clearTimeout(this.closeNotification);
  }

  render() {
    const {
      header,
      body,
      category,
      handleCloseNotifClick,
      id,
      handleNotifClick,
      type,
      stacked,
      dim
    } = this.props;

    return (
      <div
        className={'alert alert-' + category + ' alert-dismissible' + (stacked === true ? ' stacked': '')}
        role="alert"
        onClick={event => handleNotifClick(event, type)}
        style={{opacity: dim ? 0.6 : 1}}>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={event => handleCloseNotifClick(type, id)}>
          <span aria-hidden="true" className="close-icon">×</span>
        </button>
        <div className="alert-header">{header}</div>
        <div className="alert-body">{body}</div>
      </div>
    );
  }
}

export default Notification;
