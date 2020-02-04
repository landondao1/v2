import React, { Component } from 'react';
import { Modal, Panel, Col, Grid, Row } from 'react-bootstrap';

class Job extends Component {
    constructor(props) {
        super(props);

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

    getJobImage(name, image) {
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
  
    getJobImages() {
        if (this.props.job.images) {
            return this.props.job.images.map((i) => this.getJobImage(i.name, i.image));
        }
    }

    render() {
        const end = this.props.job.end === "" ? "Present" : this.props.job.end;
        const imgDir = require("../css/img/" + this.props.job.logo);
        return (
            <Col xs={12} sm={6} md={4}>
                <Panel className="clickable centered" onClick={this.showPopup}>
                    <Panel.Body>
                        <img className="medium-image" src={imgDir} alt={this.props.job.company}/>
                        <h4>{this.props.job.title}</h4>
                        <h6>{this.props.job.company}</h6>
                        <h6 className="bottom-padding">{this.props.job.start} - {end}</h6>
                        <p className="more-info">Details ></p>
                    </Panel.Body>
                </Panel>
                <Modal show={this.state.show} onHide={this.closePopup}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.props.job.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid>
                            <Row className="show-grid bottom-padding">
                            <Col xs={12} md={3} className="strong">Duration:</Col>
                            <Col xs={12} md={9}>{this.props.job.start} - {end}</Col>
                            </Row>
                            <Row className="show-grid bottom-padding">
                            <Col xs={12} md={3} className="strong">Company:</Col>
                            <Col xs={12} md={9}>{this.props.job.company}</Col>
                            </Row>
                            <Row className="show-grid bottom-padding">
                            <Col xs={12} md={3} className="strong">Description:</Col>
                            <Col xs={12} md={9}>{this.props.job.description}</Col>
                            </Row>
                            {this.getJobImages()}
                        </Grid>
                    </Modal.Body>
                </Modal>
            </Col>
        );
    }
}

export default Job;