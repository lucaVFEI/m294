import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function LernendeAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler*/
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Bei Veränderungen bei einem Textfeld werden die Daten im state gespeichert */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        createData();
    };
    
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const createData = async () => {
        const json = JSON.stringify(inputs);
        /* Headers werden gesetzt */
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        /* Fehler abfangen */
        try{
            const response = await axios.post("https://luca.dnet.ch/lernende/", json, config);
            handleShowSuccess(true);
            setInputs([]);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lernende wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernende hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLernendeNummer">
                <Form.Label>Vorname</Form.Label>
                <Form.Control required name="vorname" type="text" placeholder="Vorname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeThema">
                <Form.Label>Nachname</Form.Label>
                <Form.Control required name="nachname" type="text" placeholder="Nachname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeInhalt">
                <Form.Label>Strasse</Form.Label>
                <Form.Control name="strasse" type="text" placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDozent">
                <Form.Label>PLZ</Form.Label>
                <Form.Control name="plz" type="number" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeStartdatum">
                <Form.Label>Ort</Form.Label>
                <Form.Control type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeEnddatum">
                <Form.Label>Land</Form.Label>
                <Form.Control type="number" name="nr_land" placeholder="Land" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control type="text" name="geschlecht" placeholder="Geschlecht" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" placeholder="Telefon" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Handy</Form.Label>
                <Form.Control type="text" name="handy" placeholder="Handy" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" placeholder="Email" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Email Private</Form.Label>
                <Form.Control type="text" name="email_privat" placeholder="Email Private" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Geburtstag</Form.Label>
                <Form.Control type="date" name="geburtstag" placeholder="Geburtstag" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendeAddForm;
