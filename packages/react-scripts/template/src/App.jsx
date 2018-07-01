import React, { Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Header header={this.props.data.Header} content={this.props.data.Content}/>
        <Footer footer={this.props.data.Footer}/>
      </div>
    )
  }
}

export default App
