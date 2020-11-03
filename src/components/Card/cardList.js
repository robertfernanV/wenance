import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardComponent from './card';
import { fetchData,setHasMore } from '../../actions';
import Message from '../Message';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner,Row } from 'react-bootstrap';


const CardList = (props) =>{
    const {
        peopleList,
        peopleList :{count},
        peopleList :{currentPage},
        peopleList :{error},
        peopleList :{hasMore},
        resultFilter,
        fetchData,
        setHasMore,
    } = props;

    let loading,list = null;

    useEffect(()=>{
        fetchData();
    },[]);

    const checkHasMore = () =>{
        if(count>0){
            if(currentPage<=count){
                fetchData();
            }else{
                setHasMore(false);
                return null;
            }
        }
    }

    if(peopleList.isFeching){
        loading =<div className="d-flex justify-content-center mb-4" style={{ marginTop:50}}>
                <Spinner animation="border"/>
            </div>;
    }

    if((hasMore== false) && (resultFilter) ){
        list = resultFilter;
    }else if(peopleList.results){
        list = peopleList.results;
    }
    document.title = 'Challenge App'
    return (
        <div className='mt-5'>
            <InfiniteScroll
                dataLength={peopleList.results.length}
                next={checkHasMore}
                hasMore={hasMore}
                loader={loading}
                style={{overflow: 'hidden'}}
                endMessage={
                    <Message variant='info' message='Ups! no hay mas resultados'/>
                }
            >
                {
                    list.map( (people) =>                        
                        <Row className='mt-2 d-flex justify-content-center' key = {people.created}>
                            <CardComponent 
                                name={people.name}
                                height = {people.height}
                                gender = {people.gender}
                            />
                        </Row>
                    )
                }
            </InfiniteScroll>
            {
                error? <Message variant='danger' message='Error al obtener datos'/>:''
            }
        </div>
    );


}

const mapStateToProps = state =>{
    return {
        peopleList: state.peopleList,
        resultFilter : state.peopleList.resultFilter
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchData: () =>{
            return dispatch(fetchData())
        },
        setHasMore :(value) =>{
            return dispatch(setHasMore(value))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardList);