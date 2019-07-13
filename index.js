// Characteristics of a PURE FUNCTION
// -same output for particular input
// -NO SIDE EFFECTS  It doesn't change, make any request or interact with any element outside its scope as a function
//  output not depend of any external element or app's state they only interact with its input arguments
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creator 
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

mystore.dispatch(addTodoAction({
    name: "open account",
    id: 0,
    complete: false
}))

// REDUCER function todos
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]); // .concat() return a new state object but not mutate the current state tree
        case REMOVE_TODO:
            return state.filter((elem) => elem.id !== action.id);
        case TOGGLE_TODO:
            // JS way to toggle the object
            // return state.map(elem => elem.id === action.id ? {
            //     id: 0,
            //     name: 'Learn redux',
            //     complete: true
            // } : elem);
            // New way to toggle the object
            return state.map(todo => todo.id !== action.id ? todo : Object.assign({}, todo, {
                complete: true,
                name: 'Learn React'
            }));
        default:
            return state;

    }
}

function goals(state = [], action) {
    switch (action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal]); // .concat() return a new state object but not mutate the current state tree
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;

    }
}


// COMBINE REDUCERS
function combinerReducers(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }

}

// ACTIONS
// {
//     type: "REMOVE_TODO",
//     id: 0
// }

// STORE
function createStore(combinerReducers) {
    //Store should have 4 parts
    // 1. The state
    // 2.Get the state
    // 3.Listen for changes on the state
    // 4. Update the state

    let state;
    let listeners = [];

    const getState = () => state;

    // expect a function as param
    const subscribe = (listener) => {
        // subscribe pushing the listener 
        listeners.push(listener);
        // return the unsubscribe method
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    const dispatch = (action) => {
        // Update the state
        state = combinerReducers(state, action);
        // Execute the listeners
        listeners.map(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}



// const firstStore = createStore(combinerReducers); /// {methods}
// console.log(firstStore.getState());

// const unsubscribe = firstStore.subscribe(() => console.log(`the state has been changed to: ${firstStore.getState()}`));

// firstStore.dispatch({
//     type: 'ADD_TODO',
//     todo: {
//         id: 0,
//         name: 'Learn redux',
//         complete: false
//     }
// });

// unsubscribe();