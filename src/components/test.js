import {change} from 'actions'


class Age extends PureComponent{
	constructor(props){
		super(props);
		this.add=this.add.bind(this);
	}
	add(){
		this.props.change({
			name:'haha',
			age:this.props.age+1
		});
	}
	render(){
		return(
			<div>
				{this.props.names}:{this.props.age}
				<input type="button"onClick={this.add} value="+"/>
			</div>
		)
	}
}
const AgeConnect=connect((state)=>{
	return state.iReducer;
},(dispatch)=>{
	return {
		change:(o)=>dispatch(change(o))
	}
})(Age);


class Test extends Component{
	constructor(props){
		super(props)
	}
	shouldComponentUpdate(){
		return false;
	}
	render(){
		return(
			<div>
				{this.props.name}
				<AgeConnect  names={this.props.name} />
			</div>
		)
	}
}



const TestConnect=connect((state)=>{
	return state.iReducer;
},(dispatch)=>{
	return {
		change:(o)=>dispatch(change(o))
	}
})(Test);

export default TestConnect;