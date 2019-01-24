import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import ReactNotification from "react-notifications-component";
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import MusicPlayer from 'react-responsive-music-player'
import Info from './Info';
import SectionHeader from './SectionHeader';
import Job from './Job';
import Project from './Project';
import Certification from './Certification';
import Skill from './Skill';
import Slide from 'react-reveal/Slide'
import { isMobile } from 'react-device-detect';
import '../css/App.css';
import '../css/Music.css';
import '../css/Animations.css';
import '../css/Notifications.css';

import jobs from '../assets/data/jobs.json';
import bio from '../assets/data/bio.json';
import skills from '../assets/data/skills.json';
import certifications from '../assets/data/certifications.json';
import projects from '../assets/data/projects.json';
import playlist from '../assets/data/playlist.json';
import months from '../assets/static/months.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMusicToast: true,
      showTileToast: true
    }

    this.showMusicToastMessage = this.showMusicToastMessage.bind(this);
    this.showTileToastMessage = this.showTileToastMessage.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount() {
    // set the volume to 50%
    const volumeBar = document.getElementsByClassName("progress")[0]
    const volume = volumeBar.getBoundingClientRect().x + (volumeBar.offsetWidth/2)
    const click = document.createEvent("MouseEvent");
    click.initMouseEvent("click" ,true, true, window, null, 0, 0, volume, 0, false, false, false, false, 0, null);
    volumeBar.dispatchEvent(click);
  }

  // TODO: make the show popup function modular
  showMusicToastMessage() {
    if (this.state.showMusicToast) {
      this.notificationDOMRef.current.addNotification({
        title: "Just like MySpace days!",
        message: "Play some music as you read my portfolio.",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 7000 },
        dismissable: { click: true },
        isMobile: isMobile
      });
    }
    this.setState({showMusicToast: false})
  }

  showTileToastMessage() {
    if (this.state.showTileToast) {
      this.notificationDOMRef.current.addNotification({
        title: "Interesting?",
        message: "Click on the tiles to view more info.",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 7000 },
        dismissable: { click: true },
        isMobile: isMobile
      });
    }
    this.setState({showTileToast: false})
  }

  /**
   * Sorts the object to put newest items first
   * @param {*} a: item 1
   * @param {*} b: item 2
   * @param {*} getTimestamp: date ex. "May 2015" 
   */
  newestFirst(a, b, getTimestamp) {
    const end1 = getTimestamp(a.end);
    const end2 = getTimestamp(b.end);
    if (end1 < end2) {
      return 1;
    } else if (end1 > end2) {
      return -1;
    } else {
      const start1 = getTimestamp(a.start);
      const start2 = getTimestamp(b.start);
      if (start1 < start2) {
        return 1;
      } else if (start1 > start2) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * Takes in a date string and converts to a long
   * ex. "May 2015"
   * @param String date 
   * @returns long timestamp
   */
  getTimestamp(date) {
    if (date === "") {
      return new Date().getTime();
    }
    const datetime = date.split(" ");
    const month = months.indexOf(datetime[0]);
    const year = datetime[1];
    return new Date(year, month).getTime();
  }

  /**
   * Takes in a string date and outputs a years string
   * ex. "May 2015"
   * @param {*} developmentStart
   * @returns String years
   */
  getYearsOfExperience(developmentStart) {
    const diff = Date.now() - this.getTimestamp(developmentStart);
    const years = Math.round(diff / 3154000000) / 10
    let text = "less than a year";
    if (years === 1) {
      text =  "1 year";
    }
    else if (years > 0) {
      text =  years + " years";
    }
    return text;
  }

  /**
   * Gets an array of job panels
   */
  getJobPanels() {
    return jobs.sort((a, b) => this.newestFirst(a, b, this.getTimestamp))
               .map((job, index) => <Job key={index} job={job}/>)
  }

  getSkillPanels() {
    return skills.map((s) => <Skill key={s} name={s}/>)
  }

  getCertificationPanels() {
    return certifications.map((c) => <Certification key={c.name} name={c.name} image={c.image}/>)
  }

  getProjectPanels() {
    return projects.sort((a, b) => this.newestFirst(a, b, this.getTimestamp))
                   .map((project, index) => <Project key={index} project={project}/>)
  }
  
  render() {
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />
        <div id="feature">
          <div className="content-panel">
            <Info name={bio.name} position={bio.position} images={bio.images}/>
          </div>
        </div>
        <div id="page" className="content-panel">
          <Grid>
            <Row className="show-grid centered">
              <Jumbotron>
                <MusicPlayer playlist={playlist}/>
              </Jumbotron>
              <Waypoint onEnter={this.showMusicToastMessage}/>
            </Row>
            <Slide bottom>
              <Row>
                <SectionHeader text="About Me"/>
                <Col md={12}>
                  <h4 className="skinny">
                    {bio.text} 
                    &nbsp;I currently have {this.getYearsOfExperience(bio.development_start)} of experience.
                  </h4>
                </Col>
              </Row>
            </Slide>
            <Slide bottom>
              <Row>
                <SectionHeader text="Skills"/>
                {this.getSkillPanels()}
              </Row>
            </Slide>
            <Slide bottom>
              <Row>
                <SectionHeader text="Certifications"/>
                {this.getCertificationPanels()}
              </Row>
            </Slide>
            <Slide bottom>
              <Row>
                <SectionHeader text="Employment"/>
                {this.getJobPanels()}
                <Waypoint onEnter={this.showTileToastMessage}/>
              </Row>
            </Slide>
            <Slide bottom>
              <Row>
                <SectionHeader text="Projects"/>
                {this.getProjectPanels()}
              </Row>
            </Slide>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
