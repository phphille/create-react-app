import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar content={this.props.content} />
        <NavLink to={this.props.header.LogoTargetoUrl} ><img src={this.props.header.LogoImageUrl}/></NavLink>
      </header>
    )
  }
}

export default Header;
