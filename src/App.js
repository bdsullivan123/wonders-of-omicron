import React, { useState, useEffect } from "react";
import firebase from "./firebase";

function App() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("tests");

  function getTests() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        console.log(items);
        console.log("doc added");
      });
      setTests(items);
      setLoading(false);
    });
  }

  // function getTests2() {
  //   setLoading(true);
  //   ref.get().then((item) => {
  //     const items = item.docs.map((doc) => doc.data());
  //     setTests(items);
  //     console.log(items);
  //     setLoading(false);
  //   });
  // }

  useEffect(() => {
    getTests();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <h1>Tests</h1>
      {tests.map((test) => (
        <div key={test.id}>
          <h2>{test.title}</h2>
          <p>{test.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
