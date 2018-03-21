import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogout from 'react-google-login';
import { GoogleLogin } from 'react-google-login-component';
import firebase from 'firebase';

const provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  responseGoogle(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

    console.log({ googleId });
    console.log({ accessToken: id_token });
    //anything else you want to do(save to localStorage)...
  }

  handleChange(e) {
    /* ... */
  }
  logout() {
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    firebase.auth().signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        console.log(user)
        console.log(user.email)
        this.setState({
          user
        });
      });
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="478259615153-vjji81662n00jrj7qnc6fb8ti3dvodf2.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
         {this.state.user ?
            <button onClick={this.logout}>Log Out</button>                
            :
            <button onClick={this.login}>Log In</button>              
          }
      </div>
    );
  }

}

export default Login;
