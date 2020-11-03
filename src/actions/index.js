import { 
    FETCHING_DATA, 
    FETCHING_DATA_PEOPLE_SUCCESS, 
    FETCHING_DATA_FAILURE,
    HASH_MORE,
    UPDATE_RESULTS,
    FILTER_DATA_SUCCESS,
    DELETE_ELEMENT
} from '../constants/actionTypes';
import { fetchPeople } from '../api';

export const getData = () =>{
    return {type: FETCHING_DATA}
}

export const getDataSuccess = (data) =>{
    return {type: FETCHING_DATA_PEOPLE_SUCCESS, data}
}

export const getDataFailure = () =>{
    return {type:FETCHING_DATA_FAILURE}
}

export const hasMore =(value) =>{
    return {type:HASH_MORE,value}
}

export const updateResults =(data) =>{
    return {type:UPDATE_RESULTS,data}
}

export const setFilteredData =(data) =>{
    return  { type: FILTER_DATA_SUCCESS,data }
}

export const deleteStateELement =(data) =>{
    return {type:DELETE_ELEMENT,data}
}

export const fetchData = () =>{
    return (dispatch,getState) =>{
        const { 
            peopleList:{ page },
            peopleList: { currentPage },
         } = getState();
        
        dispatch(getData());
        ///Delay aproposito, si no no se ve el loading!!!
        setTimeout(() => {
            fetchPeople(page)
            .then(json =>{
                json.currentPage=currentPage+1;
                dispatch(getDataSuccess(json));
            })
            .catch(err =>{
                dispatch(getDataFailure());
            });
        }, 1500);
    }
}

export const setHasMore = (value) =>{
    return (dispatch) =>{
        dispatch(hasMore({hasMore:value}));
    }
}

export const filterData = (name) =>{
    return  (dispatch,getState) =>{
        const {peopleList} = getState();
        const newPeople = peopleList.results.filter(people =>{
            return people.name.toLowerCase().includes(name.toLowerCase());
        });

        dispatch(setFilteredData({
            results :newPeople,
            count : newPeople.length>0?newPeople.length:0
        }));
    }
}

export const resetState =  () => async (dispatch,getState) =>{
    const {peopleList :{results :newResults}} = getState();
    dispatch(updateResults({
        results:[],
        count : newResults.length,
        hasMore:true
    }));
    
}

export const deleteElement = (name) => {
    return (dispatch,getState) =>{
        const {
            peopleList :{results},
            peopleList :{resultFilter}
        } = getState();
        const data ={
            results:[],
            resultFilter :[]
        }
        if(results){
            if(results.length>0){
                data.results = results.filter(people =>{
                    return !people.name.toLowerCase().includes(name.toLowerCase());
                });
            }
        }
        if(resultFilter){
            if(resultFilter.length>0){
                data.resultFilter = resultFilter.filter(people =>{
                    return !people.name.toLowerCase().includes(name.toLowerCase());
                });
            }
        }

        dispatch(deleteStateELement(data));
        
    }
}
