import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducers from './redux/reducers.js'
import App from './components/app.js'

import resetCss from './css/reset.css'

const store=createStore(reducers);
store.subscribe(()=>{
	console.log('state',{...store.getState()});
})

const AppWrap=<Provider store={store}><App /></Provider>;

ReactDOM.render(
	AppWrap,
	document.getElementById('root')
)


