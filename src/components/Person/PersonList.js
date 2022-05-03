import React from "react";
import PersonItem from "./PersonItem";
import './PersonList.css';

const PersonList = (props) => {
  let content;
  console.log(props.items.length);
  if (!props.items || props.items.length === 0){
    content = <div className="empty-list"><p>Aucune personne trouvée. Vous pouvez en ajouter une.</p></div>;
  } else {
    content = <ul className="person-list">
      {props.items.map((p) => <PersonItem key={p.id} id={p.id} name={p.name} /> )}
    </ul>
  }

  return <section id="persons" className="section-person-list">{content}</section>
}

export default PersonList;