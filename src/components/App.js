import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Pack from './Pack';
import axios from 'axios';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      pack: '',
      items: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({pack: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.pack);
    event.preventDefault();
    // get our form data out of state
    const { error, pack, items } = this.state;

    const self = this;
    axios.get('https://packagist.org/search.json?q=' + this.state.pack, { error, pack, items })
      .then(function (response) {
        console.log(response.data);
        self.setState({items: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { items } = this.state;
    return (
      <Container>
        <h1>Packagist</h1>
        <p>Search PHP package repository</p>        
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group mr-2 mb-2">
            <label htmlFor="pack" className="sr-only">Package</label>
            <input className="form-control" id="pack" type="text" value={this.state.pack} onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>

        <p>Packagist is the main Composer repository. It aggregates public PHP packages installable with Composer.</p>

        {/* Render PHP packages */}
        {items != null &&
          <div><Pack packages={items} /></div>
        }
      </Container>
    );
  }
}

export default App;
