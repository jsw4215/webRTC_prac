import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Rtcview from "./component/Rtcview";
import RtcFirst from "./component/RtcFirst";


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<RtcFirst/>} />
        <Route path="/rtc" element={<Rtcview/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
