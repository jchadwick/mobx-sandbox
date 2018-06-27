import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Session } from "../../model";

@observer
export class SessionsList extends Component<{ sessions: Session[] }, never> {
  render() {
    const { sessions } = this.props;

    return (
      <ul className="list-group">
        {sessions.map(session => 
          <li className="list-group-item" key={session.key}>
            <p>{session.title}</p>
          </li>)}
      </ul>
    );
  }
}
