import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import months from '../assets/static/months.json';
import '../css/Polaroid.css';

class Info extends Component {
  getTimestamp(date) {
    if (date === "") {
      return new Date().getTime();
    }
    const datetime = date.split(" ");
    const month = months.indexOf(datetime[0]);
    const year = datetime[1];
    return new Date(year, month).getTime();
  }

  getBioImage(name, text, index) {
    const polaroid = (
      <div className="polaroid">
          <div className="polaroid-picture">
            <img className="expanded-width" src={require("../css/img/" + name)} alt={text}></img>
          </div>
          <span className="polaroid-text">{text}</span>
        </div>
    );
    if (index === 0) {
      return <Col xs={12} sm={6} md={4} key={name}>{polaroid}</Col>
    } else if (index === 1) {
      return <Col xs={12} sm={6} md={4} xsHidden key={name}>{polaroid}</Col>
    } else {
      return <Col xs={12} sm={6} md={4} smHidden xsHidden key={name}>{polaroid}</Col>
    }
  }

  getBioImages() {
    if (this.props.images) {
      const images = this.props.images.map((i, index) => this.getBioImage(i.name, i.text, index));
      return (
        <Grid className="centered polaroids">
          <Row className="show-grid">
            {images}
          </Row>
        </Grid>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getBioImages()}
        <h1 className="page-title">{this.props.name}</h1>
        <h3 className="page-title">{this.props.position}</h3>
      </div>
    );
  }
}

export default Info;