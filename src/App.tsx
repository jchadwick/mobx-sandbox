import * as React from "react";
import * as ReactDOM from "react-dom";
import { SpeakersPage } from "./pages/speakersPage";
import { SpeakersStore } from "./stores/speakersStore";
import { observer, Provider } from "mobx-react";
import { RootStore } from "./stores/baseStore";
import { SessionsStore } from "./stores/sessionsStore";

declare let module: any;

const rootStore = new RootStore();
const speakersStore = new SpeakersStore(rootStore);
const sessionsStore = new SessionsStore(rootStore);

@observer
class App extends React.Component {
  render() {
    return (
      <Provider rootStore={rootStore} speakersStore={speakersStore} sessionsStore={sessionsStore}>
        <div className="container">
          <h1>TechBash Speakers</h1>
          <SpeakersPage />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
