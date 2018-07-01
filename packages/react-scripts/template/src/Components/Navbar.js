import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <ul>
        {this.props.content.map((link, i) => {
          console.log(link.Url);
          return (
          <li key={i}>
            <NavLink activeStyle={{fontWeight: 'bold'}} to={link.Url}>
              {link.Name}
            </NavLink>
          </li>
        )
      })}
      </ul>
    )
  }
}

export default Navbar;
