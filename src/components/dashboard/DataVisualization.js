import React from "react";
import Iframe from "react-iframe";
import Navbar from "../../navbar/Navbar";

const DataVisualization = () => {
  return (
    <div className="auth-wrapper">
      <Navbar />
      <div className="auth-inner">
        <div className="form-group">
          <center>
            <Iframe
              width="1000px"
              height="750px"
              url="https://datastudio.google.com/embed/reporting/0a991d33-ea44-46f0-a715-858538a903d5/page/mcZhC"
              frameborder="1"
              style="border:1"
              allowfullscreen
            ></Iframe>
          </center>
        </div>
      </div>
    </div>
  );
};
export default DataVisualization;
