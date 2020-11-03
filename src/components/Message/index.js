import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({variant,message}) =>{
    return(
        <Alert className=" d-flex justify-content-center" variant={variant} style={{ marginTop:80}}>
                {message}
        </Alert>
    );
}

export default Message;