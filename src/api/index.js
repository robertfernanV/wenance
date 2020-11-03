const URL = 'https://swapi.dev/api/';


export const fetchPeople = (page) =>{
    if(!page){
        return fetch(`${URL}people/`)
        .then(resp =>{
            return resp.json();
        });
    }else{
        page = page.replace('http','https');
        return fetch(`${page}`)
        .then(resp =>{
            return resp.json();
        });
    }
}