import React from 'react';
import BackButton from '../../Components/BackButton';
import DozentenAddForm from '../../Components/DozentenAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DozentenAdd = () => {
return (
        <Container>
            <Row>
                <BackButton route="/Dozenten/"/>
                <Col lg={7} className="mt-5"><DozentenAddForm /></Col>
            </Row>
        </Container>
 );
};

export default DozentenAdd;


