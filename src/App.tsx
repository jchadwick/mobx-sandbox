import * as React from "react";
import * as ReactDOM from "react-dom";
import { SpeakersPage } from "./pages/speakersPage";
import { SpeakersStore } from "./stores/speakersStore";
import { observer, Provider } from "mobx-react";
import { RootStore } from "./stores/baseStore";
import { SessionsStore } from "./stores/sessionsStore";
import { RoutingStore } from "./stores/routingStore";
import { HomePage } from "./pages/homePage";

declare let module: any;

const rootStore = new RootStore();
const speakersStore = new SpeakersStore(rootStore);
const sessionsStore = new SessionsStore(rootStore);
const routingStore = new RoutingStore(rootStore);

@observer
class App extends React.Component {
  render() {
    return (
      <Provider
        rootStore={rootStore}
        routingStore={routingStore}
        speakersStore={speakersStore}
        sessionsStore={sessionsStore}
      >
        <div className="container">
          <div className="row">
            <h1>TechBash Speakers</h1>
            <nav>
              <ul>
                <a href="#/speakers">Speakers</a>
              </ul>
            </nav>
          </div>
          <div className="row">
            {routingStore.page === "speakers" ? <SpeakersPage /> : <HomePage />}
          </div>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
