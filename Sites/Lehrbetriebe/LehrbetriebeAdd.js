import React from 'react';
import BackButton from '../../Components/BackButton';
import LehrbetriebeAddForm from '../../Components/LehrbetriebeAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LehrbetriebeAdd = () => {
return (
        <Container>
            <Row>
                <BackButton route="/Lehrbetriebe/"/>
                <Col lg={7} className="mt-5"><LehrbetriebeAddForm /></Col>
            </Row>
        </Container>
 );
};

export default LehrbetriebeAdd;


