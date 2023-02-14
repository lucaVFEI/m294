import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function LehrbetriebeEditForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id_lehrbetrieb = params.id;
      
    /* State für die vorhandenen Werte der jeweiligen Felder */  
    const [loadedValues, setLoadedValues] = useState([]);  
    
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler */
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Beim aufrufen der Seite wird die Funktion zum laden der Daten aufgerufen */
    useEffect(() => {
        getData();
    }, []);
    
    /* Hier werden die Daten des Lehrbetriebes von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://luca.dnet.ch/lehrbetriebe/" + id_lehrbetrieb);
            setLoadedValues(res.data.data[0]);
        }catch(err){
            handleShowError(true);
        }  
    };
    
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
        updateData();
    };
    
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const updateData = async () => {
        const json = JSON.stringify(inputs);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try{
            const response = await axios.put("https://luca.dnet.ch/lehrbetriebe/" + id_lehrbetrieb, json, config);
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
              Lehrbetrieb wurde erfolgreich aktualisiert.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lehrbetrieb bearbeiten</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLehrbetriebFirma">
                <Form.Label>Lehrbetriebnummer</Form.Label>
                <Form.Control name="firma" type="text" placeholder="Firma" defaultValue={loadedValues.firma} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLehrbetriebStrasse">
                <Form.Label>Lehrbetriebthema</Form.Label>
                <Form.Control name="strasse" type="text" placeholder="Strasse" defaultValue={loadedValues.strasse} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebPlz">
                <Form.Label>Lehrbetriebinhalt</Form.Label>
                <Form.Control name="plz" type="text" placeholder="PLZ" defaultValue={loadedValues.plz} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebOrt">
                <Form.Label>Dozent Nr.</Form.Label>
                <Form.Control name="ort" type="text" placeholder="Ort" defaultValue={loadedValues.ort} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Speichern {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LehrbetriebeEditForm;
