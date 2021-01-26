import React from 'react';

export class Square extends React.Component {
    render() {
      return <td className={this.props.className}></td>
    }
}