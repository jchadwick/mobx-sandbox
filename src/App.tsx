import * as React from "react";
import * as ReactDOM from "react-dom";
import SpeakersPage from "./pages/speakers";
import { SpeakersStore } from "./stores/speakersStore";
import { observer, Provider } from "mobx-react";

declare let module: any;

const speakersStore = new SpeakersStore();

@observer
class App extends React.Component {
  render() {
    return (
      <Provider speakersStore={speakersStore}>
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
