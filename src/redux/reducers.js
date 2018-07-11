import {combineReducers} from 'redux'

let iReducer;
{
	let initState={
		name:'cc',
		age:123
	}

	iReducer=(state=initState,action)=>{
		switch(action.type){
			case 'change':
				return Object.assign({},state,action.data)
			default:
				return state
		}
	}
}


const reducers=combineReducers({
	iReducer,

});

export default reducers;