import React, {Component} from 'react'

class Footer extends Component {
  render() {
    return (
      <footer>
        <h1>{this.props.footer.FooterText}</h1>
      </footer>
    )
  }
}

export default Footer;
