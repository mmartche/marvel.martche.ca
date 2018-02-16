import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom'; 
import md5 from 'md5';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

export default class Home extends Component {
constructor(props) {
    super(props);
    this.state = {
    	publicKey: '', 
    	privateKey: '', 
    	goToList: false, 
    	styleGoTo: 'block'
    };
    this.handleChangeKey = this.handleChangeKey.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeKey(event) {
    this.setState({publicKey: event.target.value});
  }
  handleChangeValue(event){
  	this.setState({privateKey: event.target.value});
  }

  handleSubmit(event) {
    let dateNow = Date.now();
    let mountAccess = dateNow+this.state.privateKey+this.state.publicKey;
    sessionStorage.setItem('publicKey', this.state.publicKey);
    sessionStorage.setItem('privateKey', this.state.privateKey);
    sessionStorage.setItem('accessKey',md5(mountAccess));
    sessionStorage.setItem('dateNow',dateNow);
    this.setState({goToList:true});
    event.preventDefault();
  }

	backDoor() {
	    let dateNow = Date.now();
	    let privateKey = '1b78b991f1a58bc02a921357f2c62ffc0364c00a';
	    let publicKey = '3da6bd5228d8d94dc07abe503558fe16';
	    let mountAccess = dateNow+privateKey+publicKey;
	    sessionStorage.setItem('publicKey', publicKey);
	    sessionStorage.setItem('privateKey', privateKey);
	    sessionStorage.setItem('accessKey',md5(mountAccess));
	    sessionStorage.setItem('dateNow',dateNow);
	    console.log("Pronto, pode seguir");
	}

  render() {
    return (
	  <div>
		<AppBar title="Marvel" />
	    	<div>
	    <h3>Dados de Acesso </h3>
	    	<form onSubmit={this.handleSubmit}>
			    <TextField
			      hintText="Public Key"
			      floatingLabelText="Public Key"
			      value={this.state.publicKey}
			      onChange={this.handleChangeKey}
			    />
			    <br />
			    <TextField
			      hintText="Private Key"
			      floatingLabelText="Private Key"
			      value={this.state.privateKey}
			      onChange={this.handleChangeValue}
			    />
			    <br />
			    <RaisedButton label="Acessar" primary={true} type="submit" />
			</form>
			{this.state.goToList && (
				<Redirect to={this.props.location.state || '/list-characters'} />
			)}
		<Paper zDepth={1} className="helper-home">
			<label>My public key: 3da6bd5228d8d94dc07abe503558fe16</label><br />
			<label>Your private key: 1b78b991f1a58bc02a921357f2c62ffc0364c00a</label>
			<FlatButton label="Entrada Secreta" fullWidth={true} onClick={this.backDoor} /><br /><br />
			<Link to='/list-characters' style={{display:this.state.styleGoTo}} >Seguir sem a Chave</Link>
		</Paper>
		</div>
	  </div>
	);
	}
}