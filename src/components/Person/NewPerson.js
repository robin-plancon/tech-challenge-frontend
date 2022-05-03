import React, { useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";
import "./NewPerson.css";

const NewPerson = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitPersonHandler = (event) => {
    event.preventDefault();
    props.onAddPerson(enteredName);
    setEnteredName('');
  };

  return (
    <section id="new-person" className="new-person">
      <h2>Ajouter une nouvelle personne</h2>
      <form className="form-inline" onSubmit={submitPersonHandler}>
        <Input
          type="text"
          label="Nom"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <Button type="submit">Ajouter la personne</Button>
      </form>
    </section>
  );
};

export default NewPerson;