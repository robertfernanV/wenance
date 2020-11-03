import React from 'react';
import { Card,Button,Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteElement } from '../../actions';


const CardComponent = (props) =>{

    const {
        name,
        height,
        gender,
        deleteElement
    } = props;

    const handleClick =()=>{
        deleteElement(name);
    }
    return(
        <Col xs={8} className='mt-2'>
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button variant="danger float-right" onClick={handleClick} >Borrar</Button>
                <p>
                    <b>Height:</b>{height}
                </p>
                <p>
                    <b>Gender:</b>{gender}
                </p>
            </Card.Body>
        </Card>
        </Col>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        deleteElement :(name) =>{
            return dispatch(deleteElement(name))
        }
    }
}

export default connect(null,mapDispatchToProps)(CardComponent);