import "./App.css";
import { connect } from "react-redux";
import File from "./components/File";
import Sample from "./components/Sample";
import Download from "./components/Download";

function App({ nextStep }) {
  return (
    <div className="app">
      {nextStep === 1 && <File />}
      {nextStep === 2 && <Sample />}
      {nextStep === 3 && <Download />}
    </div>
  );
}

function mapStateToProps({ nextStep }) {
  return {
    nextStep,
  };
}
export default connect(mapStateToProps)(App);
