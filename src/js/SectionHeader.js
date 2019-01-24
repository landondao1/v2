import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class SectionHeader extends Component {
  render() {
    return (
        <PageHeader>
            {this.props.text}
        </PageHeader>
    );
  }
}

export default SectionHeader;