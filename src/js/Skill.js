import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import icons from '../assets/static/icons'

class Skill extends Component {
  render() {
    const skill = icons[this.props.name]
    const imgDir = "img/" + skill.image;
    return (
      <Col xs={6} sm={3} md={2} className="bottom-padding centered">
        <img className="small-image" src={imgDir} alt={skill.name}/>
        <h4>{skill.name}</h4>
      </Col>
    );
  }
}

export default Skill;