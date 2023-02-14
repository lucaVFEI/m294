import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function LernendeEditForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id_lernende = params.id;
      
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
    
    /* Hier werden die Daten des Lernendes von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://luca.dnet.ch/lernende/" + id_lernende);
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
            const response = await axios.put("https://luca.dnet.ch/lernende/" + id_lernende, json, config);
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
              Lernende wurde erfolgreich aktualisiert.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernende bearbeiten</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLernendeNummer">
                <Form.Label>Vorname</Form.Label>
                <Form.Control name="vorname" type="text" placeholder="Vorname" defaultValue={loadedValues.vorname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeThema">
                <Form.Label>Nachname</Form.Label>
                <Form.Control name="nachname" type="text" placeholder="Nachname" defaultValue={loadedValues.nachname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeInhalt">
                <Form.Label>Strasse</Form.Label>
                <Form.Control name="strasse" type="text" placeholder="Strasse" defaultValue={loadedValues.strasse} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDozent">
                <Form.Label>PLZ</Form.Label>
                <Form.Control name="plz" type="number" placeholder="PLZ" defaultValue={loadedValues.plz} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeStartdatum">
                <Form.Label>Ort</Form.Label>
                <Form.Control type="text" name="ort" placeholder="Ort" defaultValue={loadedValues.ort} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeEnddatum">
                <Form.Label>Land</Form.Label>
                <Form.Control type="number" name="nr_land" placeholder="Land" defaultValue={loadedValues.nr_land} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control type="text" name="geschlecht" placeholder="Geschlecht" defaultValue={loadedValues.geschlecht} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" placeholder="Telefon" defaultValue={loadedValues.telefon} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Handy</Form.Label>
                <Form.Control type="text" name="handy" placeholder="Handy" defaultValue={loadedValues.handy} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" placeholder="Email" defaultValue={loadedValues.email} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>Email Privat</Form.Label>
                <Form.Control type="text" name="email_privat" placeholder="Email Private" defaultValue={loadedValues.email_privat} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeDauer">
                <Form.Label>geburtstag</Form.Label>
                <Form.Control type="date" name="geburtstag" placeholder="Geburtstag" defaultValue={loadedValues.geburtstag} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Speichern {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendeEditForm;
