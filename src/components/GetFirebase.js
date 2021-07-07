import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from 'uuid';

const GetFirebase = () => {
    const [tests, setTests] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const ref = firebase.firestore().collection("tests");

    function getTests() {
        ref.get().then((item) => {
            const items = item.docs.map((doc) => doc.data());
            setTests(items);
        });
    }

    useEffect(() => {
        getTests();
    }, []);

    function addTest(newTest) {
        ref
            .doc(newTest.id)
            .set(newTest)
            .then(() => {
                setTests((prev) => [newTest, ...prev]);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function deleteTest(test) {
        ref
            .doc(test.id)
            .delete()
            .then(() => {
                setTests((prev) =>
                    prev.filter((element) => element.id !== test.id)
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function editTest(updatedTest) {
        ref
            .doc(updatedTest.id)
            .update(updatedTest)
            .then(() => {
                setTests((prev) =>
                    prev.map((element) => {
                        if (element.id !== updatedTest.id) {
                            return element;
                        }
                        return updatedTest;
                    })
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div>
            <div>
                <h1>Tests</h1>
                <div className="text-area">
                    <h3>Add/Edit Test</h3>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                    <textarea onChange={(e) => setDesc(e.target.value)} />
                    <button onClick={() => addTest({ title, desc, id: uuidv4() })}>
                        Submit
                </button>
                </div>
                <hr />
                {tests.map((test) => (
                    <div key={test.id}>
                        <h2>{test.title}</h2>
                        <p>{test.desc}</p>
                        <div>
                            <button onClick={() => deleteTest(test)}>X</button>
                            <button
                            onClick={() =>
                                editTest({title: test.title, desc, id: test.id })
                            }
                        >
                            Edit
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetFirebase;
