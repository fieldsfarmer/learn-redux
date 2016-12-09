var redux = require('redux');

console.log('staring redux example');

var stateDefault = {
  name: 'Anoymous',
  hobbies: [],
  movies: []
};

// Name reducer and action generator
//------------------------------------
var nameReducer = (state='Anoymous',action)=>{
  switch(action.type){
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
}
var changeName = (name)=>{
  return {
    type: 'CHANGE_NAME',
    name
  }
}

// Hobbies reducer and action generators
//---------------------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id);
    default:
      return state;
  }
};


var addHobby = (hobby)=>{
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}
var removeHobby = (id)=>{
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

// Movies reducer and action generators
//---------------------------------------
var nextMovieId = 1;

var moviesReducer = (state=[],action)=>{
  switch(action.type){
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie)=>movie.id !== action.id);
    default:
      return state;
  }
}
var addMovie = (title,genre)=>{
  return{
    type: 'ADD_MOVIE',
    title,genre
  }
}
var removeMovie = (id)=>{
  return{
    type: 'REMOVE_MOVIE',
    id
  }
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
})
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension? window.devToolsExtension():f=>f));

var currentState = store.getState();
console.log('Current state', currentState);

var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  console.log('State is', state);
  document.getElementById('app').innerHTML = state.name;
})

store.dispatch(changeName('Kevin'));
store.dispatch(changeName('Lily'));

store.dispatch(addHobby('Running'));

store.dispatch(addMovie('Matrix', 'SciFi'));

store.dispatch(addHobby('Cooking'));
store.dispatch(addHobby('Learning React'));

store.dispatch(removeHobby(1));

store.dispatch(addMovie('Mad Max', 'Action'));
store.dispatch(removeMovie(1));


// //Pure function
// //no side affect; as input is the same, output is always the same;
// //no async calls
