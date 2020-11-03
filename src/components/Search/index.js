import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Form,Button,FormControl, Navbar} from 'react-bootstrap';
import { setHasMore,filterData,resetState } from '../../actions';

const Search = (props) =>{
    const { 
            setHasMore,
            filterData,
            resetState
    } = props;
    const [searchValue,setSearchVaule] = useState('');

    const handleChange =(value)=>{
        setSearchVaule(value);
    }

    const handleClick =() =>{
        if(searchValue===''){
            resetState();       
            return;
        }else{
            setHasMore(false,false);
            filterData(searchValue);
        }
    }
    return (
        <Navbar fixed="top" expand="lg" bg="white" className='mb-0 pb-0'>
            <div className='flex-grow-1 d-flex'>
                <Form inline className='flex-nowrap mx-0 mx-lg-auto rounded p-1'>
                    <FormControl type="text" placeholder="Buscar" value={searchValue} onChange={e =>handleChange(e.target.value) } className="mr-sm-2" />
                    <Button variant="primary" onClick={handleClick}>Buscar</Button>
                </Form>
            </div>
        </Navbar>
    )
}


const mapDispatchToProps = dispatch =>{
    return  {
        setHasMore :(value,backup) =>{
            return dispatch(setHasMore(value,backup))
        },
        filterData: (name) =>{
            return dispatch(filterData(name))
        },
        resetState: () =>{
            return dispatch(resetState())
        }
    }
}

export default connect(null,mapDispatchToProps)(Search);