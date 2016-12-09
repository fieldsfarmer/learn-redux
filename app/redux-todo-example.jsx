var redux = require('redux');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state=stateDefault, action)=>{
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state;
  }
}

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension? window.devToolsExtension():f=>f));

store.subscribe(()=>{
  var state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
  console.log(state.searchText);
})

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'some text'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Eva'
});
// console.log(store.getState())
