import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NewPerson from "./components/Person/NewPerson";
import PersonList from "./components/Person/PersonList";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loadedPersons, setLoadedPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPersons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/persons", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        setLoadedPersons(responseData.persons);
        setIsLoading(false);
      } catch (err) {
        throw new Error("");
      }
    };

    fetchPersons();
  }, []);

  const addPersonHandler = async (personName) => {
    try {
      const newPerson = {
        name: personName,
      };
      let hasError = false;
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/persons", {
        method: "POST",
        body: JSON.stringify(newPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        toast.warn(responseData.error.message);
        throw new Error(responseData.error.message);
      }

      setLoadedPersons([
        ...loadedPersons,
        { id: responseData.id, name: newPerson.name },
      ]);
    } catch (err) {
      throw new Error(err.message || "Something went wrong");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <ToastContainer position="top-center" limit={1} autoClose={5000} />
        <NewPerson onAddPerson={addPersonHandler} />
        {isLoading && <p className="loader">Loading</p>}
        {!isLoading && <PersonList items={loadedPersons} />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
