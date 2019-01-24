import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

class Certification extends Component {
  render() {
    const imgDir = "img/" + this.props.image;
    return (
      <Col xs={6} sm={4} md={3} className="bottom-padding centered">
        <img className="medium-image" src={imgDir} alt={this.props.name}/>
      </Col>
    );
  }
}

export default Certification;