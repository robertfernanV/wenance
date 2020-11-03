import { 
    FETCHING_DATA,
    FETCHING_DATA_PEOPLE_SUCCESS,
    FETCHING_DATA_FAILURE,
    HASH_MORE,
    UPDATE_RESULTS,
    FILTER_DATA_SUCCESS,
    DELETE_ELEMENT
 } from '../constants/actionTypes';

const initialState ={
    isFeching:false,
    error:false,
    page:null,    
    count:0,
    currentPage:1,
    hasMore:true,
    results:[],
    resultFilter:[]
    
}

const peopleReducer=  (state =initialState,action) =>{
    switch(action.type){
        case FETCHING_DATA:            
            return {
                ...state,                
                isFeching:true,
                error:false
            }
        case FETCHING_DATA_PEOPLE_SUCCESS:          
            return {
                ...state,
                results: state.results.concat(action.data.results),
                isFeching:false,
                error:false,
                page : action.data.next,
                count : action.data.count,
                currentPage : action.data.currentPage
            }
        case FETCHING_DATA_FAILURE :
            return {
                ...state,
                isFeching:false,
                error:true
            }
        case HASH_MORE:
            return {
                ...state,
                hasMore:action.hasMore
            }
        case FILTER_DATA_SUCCESS:
            return {
                ...state,                           
                hasMore:false,
                resultFilter:action.data.results
            }
        case UPDATE_RESULTS:
            return {
                ...state,
                resultFilter : action.data.results,
                count : action.data.count,
                hasMore:action.data.hasMore
            }
        case DELETE_ELEMENT:
            return {
                ...state,
                results:action.data.results,
                resultFilter:action.data.resultFilter
            }
        default:
            return state;
    }
};

export default peopleReducer;