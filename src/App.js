import logo from './logo.svg';
import './App.css';
import Insert from './Insert';
import DataView from './DataView';
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function App() {
    const [uid, setuid] = useState('')
  return (
        <>
            <Row>
                <Col>
                    <Insert updateMovieId={uid} />
                </Col>
                <Col>
                    <DataView updateId={(id)=>setuid(id)}/>
                </Col>
            </Row>
        </>
  );
}

export default App;
