import { Provider } from "react-redux";
import store from "./app/store";
import Wrapper from "./components/Wrapper";

import "./App.css";


function App() {
  return (
    <Provider store={store}>
      <Wrapper/>
    </Provider>
  );
}

export default App;
