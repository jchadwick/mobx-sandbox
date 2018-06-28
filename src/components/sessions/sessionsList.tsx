import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Session } from "../../model";
import { observable } from "mobx";

@observer
export class SessionsList extends Component<{ sessions: Session[] }, never> {
  render() {
    return (
      <div className="list-group">
        {this.props.sessions.map(session => (
          <SessionsListItem key={session.key} session={session} />
        ))}
      </div>
    );
  }
}

@observer
class SessionsListItem extends Component<{ session: Session }, never> {
  @observable isExpanded = false;

  render() {
    const { session } = this.props;

    return (
      <div style={{}} className="list-group-item" onClick={() => this.isExpanded = !this.isExpanded}>
        <h4 className="list-group-item-heading">{session.title}</h4>
        {this.isExpanded ? (
          <div className="list-group-item-text">{session.description}</div>
        ) : null}
      </div>
    );
  }
}
