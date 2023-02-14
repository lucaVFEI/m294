import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function KurseAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    let [inputsLernende, setInputsLernende] = useState([]);

    const [lernendeValues, setLernendeValues] = useState([]);
    const [dozentenValue, setDozentenValue] = useState([]);
    const [KursIdValue, setKurseValues] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler*/
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);
    
    let lernendeID = [];

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
        addLernende();
    };

    const addLernende = async () => {
        console.log('Lernende');
        console.log(lernendeID);
        let kursID = KursIdValue;
        console.log(KursIdValue);
        for (let i = 0; i < lernendeID.length; i++)
        {
            console.log(lernendeID[i])
            //console.log(inputsLernende)
            let json = {
                'nr_kurs': kursID,
                'nr_lernende': Math.floor(lernendeID[i].value),
            };
            console.log(json)
            /* Headers werden gesetzt */
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            /* Fehler abfangen */
            try{
                const response = await axios.post("https://luca.dnet.ch/kurse_lernende/", json, config);
                handleShowSuccess(true);
                setInputsLernende([]);
            }catch(err){
                handleShowError(true);
            }
            handleLoading(false);
            inputsLernende = "";
        }
    };

    const handleChangeDozent = (selectedOptions) => {
        setInputs(values => ({...values, "nr_dozent": selectedOptions.value}))
        };

    const handleChangeLernende = (selectedOptions) => {
        lernendeID = [];
        for (let i = 0; i<selectedOptions.length; i++)
        {
            lernendeID.push(selectedOptions[i]);
        }
        //setInputsLernende(values => ({...values, "nr_lernende": selectedOptions.value}))
        console.log(selectedOptions[0].value);
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
            const response = await axios.post("https://luca.dnet.ch/kurse/", json, config);
            handleShowSuccess(true);
            setInputs([]);            
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };

    useEffect(() => {
        getLernende();
        getDozenten();
        getKursID();        
    }, []);

    const getLernende = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://luca.dnet.ch/lernende/");
            //console.log(res);
            setLernendeValues(res.data.data);
        }catch(err){
            handleShowError(true);
        }  
    };

    const getKursID = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://luca.dnet.ch/kurse/");
            //console.log(res);
            //setKurseValues(res.data.data.id_kurs)
            let kurseID = res.data.data
            let ID = 0;
            for(let i = 0; i < kurseID.length; i++)
            {
                if (parseInt(kurseID[i].id_kur) > parseInt(ID))
                {
                    ID = kurseID[i].id_kurs;
                }
            }
            ID++;
            console.log(ID);
            setKurseValues(ID)
            return ID 
        }catch(err){
            handleShowError(true);
        }
    };

    const getDozenten = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://luca.dnet.ch/dozenten/");
            //console.log(res);
            setDozentenValue(res.data.data);
        }catch(err){
            handleShowError(true);
        }  
    };

    let optionsLernende = []
    let optionsDozent = []

    for (let i = 0; i < lernendeValues.length; i++)
    {
        optionsLernende.push(new Item(lernendeValues[i].id_lernende, lernendeValues[i].vorname))
    }

    function Item(value, label) {
        this.value = value;
        this.label = label;
        }

    for (let i = 0; i < dozentenValue.length; i++)
    {
        optionsDozent.push(new Item(dozentenValue[i].id_dozent, dozentenValue[i].vorname))
    }

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Kurs wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Kurs hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formKursNummer">
                <Form.Label>Kursnummer</Form.Label>
                <Form.Control required name="nr_kurs" type="number" placeholder="Kursnummer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursThema">
                <Form.Label>Kursthema</Form.Label>
                <Form.Control required name="kursthema" type="text" placeholder="Kursthema" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursInhalt">
                <Form.Label>Kursinhalt</Form.Label>
                <Form.Control required name="inhalt" as="textarea" rows={3} placeholder="Kursinhalt" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDozent">
                <Form.Label>Dozent Nr.</Form.Label>
                <Select options={optionsDozent} isSearchable={true} onChange={handleChangeDozent}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursStartdatum">
                <Form.Label>Startdatum</Form.Label>
                <Form.Control type="date" name="startdatum" placeholder="Startdatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursEnddatum">
                <Form.Label>Enddatum</Form.Label>
                <Form.Control type="date" name="enddatum" placeholder="Enddatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDauer">
                <Form.Label>Dauer</Form.Label>
                <Form.Control type="number" name="dauer" placeholder="Dauer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDozent">
                <Form.Label>Lernende</Form.Label>
                <Select options={optionsLernende} isSearchable={true} isMulti menuPlacement="top" onChange={handleChangeLernende}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default KurseAddForm;
