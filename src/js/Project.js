import React, { Component } from 'react';
import { Popover, OverlayTrigger, Panel, Modal, Col, Grid, Row } from 'react-bootstrap';
import icons from '../assets/static/icons'

class Project extends Component {
  constructor(props) {
    super(props)

    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.state = { show: false };
  }

  closePopup() {
    this.setState({ show: false });
  }

  showPopup() {
    this.setState({ show: true });
  }

  getProjectIcon(name) {
    const skill = icons[name];
    const popover = <Popover id={skill.name}>This project uses {skill.name}</Popover>;
    return (
      <OverlayTrigger key={skill.name} trigger={['hover']} placement="top" overlay={popover}>
        <img className="tiny-image" src={require("../css/img/" + skill.image)} alt={skill.name}/>
      </OverlayTrigger>
    );
  }

  getProjectIcons() {
    return this.props.project.stack.map((s) => this.getProjectIcon(s));
  }

  getProjectImage(name, image) {
    return (
      <Row key={name} className="show-grid">
        <Col md={12}>
          <Panel className="no-hover">
            <Panel.Body className="no-padding">
              <img className="full-width" src={require("../css/img/" + image)} alt={name}/>
            </Panel.Body>
            <Panel.Footer>{name}</Panel.Footer>
          </Panel>
        </Col>
      </Row>
    );
  }

  getProjectImages() {
    if (this.props.project.images) {
      return this.props.project.images.map((i) => this.getProjectImage(i.name, i.image));
    }
  }

  getProjectLink() {
    if (this.props.project.link) {
      return (
        <Row className="show-grid bottom-padding">
          <Col xs={12} md={3} className="strong">Link:</Col>
          <Col xs={12} md={9}>
            <a target="_blank" href={this.props.project.link}>{this.props.project.link}</a>
          </Col>
        </Row>
      );
    }
  }

  render() {
    const end = this.props.project.end === "" ? "Present" : this.props.project.end;
    return (
      <Col xs={12} sm={6} md={4}>
        <Panel className="clickable" onClick={this.showPopup}>
          <Panel.Body>
            <h5>{this.props.project.name}</h5>
            <h6 className="bottom-padding">{this.props.project.start} - {end}</h6>
            {this.getProjectIcons()}
            <p className="more-info">Details ></p>
          </Panel.Body>
        </Panel>

        <Modal show={this.state.show} onHide={this.closePopup}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.project.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid bottom-padding">
                <Col xs={12} md={3} className="strong">Duration:</Col>
                <Col xs={12} md={9}>{this.props.project.start} - {end}</Col>
              </Row>
              <Row className="show-grid bottom-padding">
                <Col xs={12} md={3} className="strong">Tech Stack:</Col>
                <Col xs={12} md={9}>{this.getProjectIcons()}</Col>
              </Row>
              <Row className="show-grid bottom-padding">
                <Col xs={12} md={3} className="strong">Description:</Col>
                <Col xs={12} md={9}>{this.props.project.description}</Col>
              </Row>
              <Row className="show-grid bottom-padding">
                <Col xs={12} md={3} className="strong">Challenges:</Col>
                <Col xs={12} md={9}>{this.props.project.challenges}</Col>
              </Row>
              {this.getProjectLink()}
              {this.getProjectImages()}
            </Grid>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default Project;