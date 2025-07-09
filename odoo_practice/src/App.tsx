import React from "react";
import './index.css'
import CrimeForm from './CrimeReportForm'
import MainScreen from "./MainScreen";

const App = () => {
  return (
    <div>
      <MainScreen />
      <CrimeForm />
    </div>
  );
};

export default App;