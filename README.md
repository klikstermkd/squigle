## Squigle

> React component for displaying notifications.


## Features
- Displays notifications in the top right corner.
- Supports different notification categories.
- Notifications are closable.
- Notifications with the category `info` are closed automatically after 90 seconds.
- It displays maximum 5 notifications at the same time.
- If the maximum amount of notifications is reached, older notifications are
grouped into one.

See it in action! https://squigle-rtvbyvabzo.now.sh


## Installing

Install the dependencies to run the project:

```
npm install
```


## Running

After installation is done, run the project by typing:

```
npm start
```

This will start a local server at `http://localhost:3000`.


## Using

Here's an example on how the use the component.

```js
class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNotification = this.addNotification.bind(this);
  }

  addNotification(event) {
    event.preventDefault();

    const notification = {
      header: 'Header text',
      body: 'Body text',
      category: 'info'
    };

    this.notificationsContainer.addNotification(notification);
  }

  render() {
    return (
      <div>
        <button onClick={this.addNotification}>Add notification</button>
        <NotificationsContainer ref={comp => this.notificationsContainer = comp} />
      </div>
    )
  }
}
```


## Methods

As you can see from the example above, we just keep a `ref` from the
component, and there are 3 available methods that we can use:

### `addNotification(notification)`

Creates a new notification. It returns the created notification where you can
take its `id` for later use, such as programatically closing it.

### `closeNotification(id)`

Closes a notification. This method allows you to programatically close
a notification.

### `closeAllNotifications()`

When invoked, this method will close all notifications programatically.


## Creating a notification

| Parameter | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| header    | string  | Header text of the notification.                                  |
| body      | string  | Body text of the notification.                                    |
| category  | string  | Category of the notification. Available: info, warning and error. |


## Building

To make a production ready build, type:

```
npm run build
```

This will create a directory `build` that contains the needed files.


## Running the Tests

To run the tests, type:

```
npm test
```
