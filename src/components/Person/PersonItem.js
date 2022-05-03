import React from "react";

import "./PersonItem.css";

const PersonItem = (props) => {
  return (
    <div className="person-item">
      <li id={props.id}>
          <h2>{props.name}</h2>
      </li>
    </div>
  );
};

export default PersonItem;
