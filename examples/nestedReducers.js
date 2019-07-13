// STATE TREE STRUCTURE
// {
//     users: {},
//     setting: [],
//     tweets: {
//         btyxlj: {
//             id: 'btyxlj',
//             text: 'What is a jQuery?',
//             author: {
//                 name: 'Tyler McGinnis',
//                 id: 'tylermcginnis',
//                 avatar: 'twt.com/tm.png'
//             }
//         }
//     }
// }
// author reducer
function author(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_NAME':
            return true;
        case 'UPDATE_ID':
            return true;
            // nested date to be updated
        case 'UPDATE_TWEET':
            return {
                ...state, avatar: action.newAvatar
            };
        default:
            return state;
    }
}

// tweet reducer
function tweet(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_ID':
            return true;
        case 'UPDATE_TWEET_TEXT':
            return true;
            // nested date to be updated
        case 'UPDATE_TWEET':
            return {
                ...state, author: author(state.author, action)
            };
        default:
            return state;
    }
}


// tweets reducer
function tweets(state = {}, action) {
    switch (action.type) {
        case 'ADD_TWEET':
            return true;
        case 'REMOVE_TWEET':
            return true;
            // nested date to be updated
        case 'UPDATE_TWEET':
            return {
                ...state, [action.tweetID]: tweet(state[action.tweetID], action)
            };
        default:
            return state;
    }
}

// User Reducer
function users(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER':
            return true;
        case 'REMOVE_USER':
            return true;
        default:
            return state;
    }
}
// Settings reducer
function settings(state = [], action) {
    switch (action.type) {
        case 'ADD_SETTING':
            return true;
        case 'REMOVE_SETTING':
            return true;
        default:
            return state;
    }
}

// reducers Combiner

const reducer = combinerReducers({
    tweets,
    users,
    settings
})