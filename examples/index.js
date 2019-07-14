// Characteristics of a PURE FUNCTION
// -same output for particular input
// -NO SIDE EFFECTS  It doesn't change, make any request or interact with any element outside its scope as a function
//  output not depend of any external element or app's state they only interact with its input arguments
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';


// TODOS REDUCERS
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
                complete: !todo.complete,
            }));
        default:
            return state;

    }
}

// TODO's ACTION CREATORS
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}


// GOALS REDUCER
function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]); // .concat() return a new state object but not mutate the current state tree
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;

    }
}

// GOALS ACTION CREATOR
function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

// COMBINE REDUCERS
// function combinerReducers(state = {}, action) {
//     return {
//         todos: todos(state.todos, action),
//         goals: goals(state.goals, action)
//     }

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

const myStore = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}));

// const let_me_know = myStore.subscribe(() => console.log(myStore.getState()));