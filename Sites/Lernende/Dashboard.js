import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LernendeTable from '../../Components/LernendeTable'

const Lernende = () => {
return (
        <Container>
            <Row>
                <Col className="mt-5"><LernendeTable /></Col>
            </Row>
        </Container>
 );
};

export default Lernende;


