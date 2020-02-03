import React, { Component } from 'react';
import { Popover, OverlayTrigger, Col } from 'react-bootstrap';
import skills from '../assets/data/skills'
import icons from '../assets/static/icons'

class Skill extends Component {
  render() {
    const skillSection = skills[this.props.name]
    var skillIcons = []

    for (var i = 0; i < skillSection.length; i++) {
      const skillName = skillSection[i];
      const skill = icons[skillName];
      const popover = <Popover id={skill.name}>{skill.name}</Popover>;

      if (skill.link) {
        const skillIcon = (
          <OverlayTrigger key={skill.name} trigger={['hover']} placement="top" overlay={popover}>
            <a href={skill.link} target="_blank">
              <img className="small-image" src={url("img/" + skill.image)} alt={skill.name}/>
            </a>
          </OverlayTrigger>
        )
        skillIcons.push(skillIcon);
      }
      else {
        const skillIcon = (
          <OverlayTrigger key={skill.name} trigger={['hover']} placement="top" overlay={popover}>
            <img className="small-image" src={url("img/" + skill.image)} alt={skill.name}/>
          </OverlayTrigger>
        )
        skillIcons.push(skillIcon);
      }
    }
    
    return (
      <Col xs={12} sm={6} md={4} className="centered highlight-padding">
        <div>
          <h4>{this.props.name}</h4>
        </div>
        {skillIcons}
      </Col>
    );
  }
}

export default Skill;