var redux = require('redux');

console.log('staring redux example');

var stateDefault = {
  name: 'Anoymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state=stateDefault, action)=>{
  switch(action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies : state.hobbies.filter((hobby)=>hobby.id !== action.id)
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie)=>movie.id !== action.id)
      };
    default:
      return state;
  }
}
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension? window.devToolsExtension():f=>f));

var currentState = store.getState();
console.log('Current state', currentState);
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  console.log('State is', state);
  document.getElementById('app').innerHTML = state.name;
})
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Kevin'
});
// unsubscribe();
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Lily'
});
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
})
store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Matrix',
  genre: 'Sci fi'
})
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Cooking'
});
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Learning React'
})
store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
})
store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
})
store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
})
//Pure function
//no side affect; as input is the same, output is always the same;
//no async calls
