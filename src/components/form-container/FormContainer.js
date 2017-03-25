import React from 'react';

import './FormContainer.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: '',
      body: '',
      category: 'info'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({[id]: value});
  }

  render() {
    return (
      <form className="create-notification-container" ref={form => this.form = form}>
        <fieldset>
          <legend>Create notification:</legend>

          <label htmlFor="header">
            <span>Header text:</span><br/>
            <input
              type="text"
              id="header"
              value={this.state.header}
              onChange={this.handleChange}
              required="true" />
          </label>

          <br/><br/>

          <label htmlFor="body">
            <span>Body text:</span><br/>
            <input
              type="text"
              id="body"
              value={this.state.body}
              onChange={this.handleChange}
              required="required" />
          </label>

          <br/><br/>

          <label htmlFor="category">
            <span>Category:</span><br/>
            <select value={this.state.category} onChange={this.handleChange} id="category">
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </label>

          <br/><br/>

          <button type="submit" onClick={event => {
            if (this.form.checkValidity()) {
              event.preventDefault();
              this.setState({header: '', body: '', category: 'info'});
              this.props.handleFormSubmit(this.state);
            }
          }}>Create</button>
        </fieldset>
      </form>
    )
  }
}

export default App;
