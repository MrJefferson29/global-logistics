import React from "react";
import { Col } from "react-bootstrap";

const NoStories = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "40px 20px",
    }}
  >
    <Col md="5" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5em" }}>
        Sorry, No package was found with that Courier ID
      </p>
      <p style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.75em" }}>
        Please check your ID and try again.
      </p>
      <p style={{ fontSize: "1.2rem", fontWeight: "400" }}>
        If you still cannot find your package, please quickly contact our
        customer support service, we will solve your issue as soon as possible.
      </p>
    </Col>
  </div>
);

export default NoStories;
