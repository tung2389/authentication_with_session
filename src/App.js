import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

async function submit(url,data)
{
  await fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:data,
    credentials:'include',
  }).then(res => res.text()
    .then(res => alert(res)));
};

class login extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      email:undefined,
      password:undefined,
      is_log_in:false,
      data:undefined
    };
    this.notSubmit = this.notSubmit.bind(this);
    this.change_form = this.change_form.bind(this);
    this.login = this.login.bind(this);
    this.check_login = this.check_login.bind(this);
  }
  async check_login()
  {
    let res = await fetch("https://lkt-back-end.herokuapp.com/authen_and_autho/profile",{
      method:'GET',
      credentials:'include'
    });
    try
    {
      res = await res.json();
      this.setState({is_log_in:true,data:res});
    }
    catch
    {
      this.setState({is_log_in:false});
    }
  }
  componentDidMount(){
    this.check_login();
  }
  async login()
  {
    if(this.state.email && this.state.password)
    {
    let data = JSON.stringify({
      email:this.state.email,
      password:this.state.password
    });
    await submit("https://lkt-back-end.herokuapp.com/authen_and_autho/login",data);
    this.check_login();
    }
  }
  notSubmit(e)
  {
    e.preventDefault();
  }
  change_form(e,param)
  {
    this.setState({[param]:e.target.value})
  }
  render(){
    return(
      (this.state.is_log_in)
      ?
      (
        <Success_login data = {this.state.data}/>
      )
      :
      (
      <div className = "float-up">
        <Paper elevation = {1} className = "center_content">
        <form className = "center" onSubmit =  {this.notSubmit} >
        <Typography component="h1" variant="h5">
            Log in
        </Typography>
        <TextField margin = "normal" className = "test" label = "Email" onChange ={(e) => this.change_form(e,"email")} required />
        <br/>
        <TextField margin = "normal" className = "test" label = "Password" onChange = {(e) => this.change_form(e,"password")} required />
        <br/>
        <Button type = "submit" color = "primary" variant = "contained" className = "login_btn" onClick = {this.login}>Log in</Button>
        </form>
        </Paper>
        </div>
      )
    );
  }
}

class sign_up extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      email:undefined,
      password:undefined,
      confirm_password:undefined,
      username:undefined
    }
    this.notSubmit = this.notSubmit.bind(this);
    this.change_form = this.change_form.bind(this);
    this.sign_up = this.sign_up.bind(this);
  }
  sign_up()
  {
    if(this.state.email && this.state.username && this.state.password && this.state.confirm_password)
    {
    if(this.state.password === this.state.confirm_password)
    {
    let data = JSON.stringify({
      email:this.state.email,
      username:this.state.username,
      password:this.state.password
    });
    submit("https://lkt-back-end.herokuapp.com/authen_and_autho/sign_up",data);
    }
    else
    {
      alert("Two passwords are not the same");
    }
    }
  }
  notSubmit(e)
  {
    e.preventDefault();
  }
  change_form(e,param)
  {
    this.setState({[param]:e.target.value})
  }
  render()
  {
    return(
      <div className = "float-up">
        <Paper elevation = {1} className = "center_content">
        <form className = "center" onSubmit =  {this.notSubmit}>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <TextField margin = "normal" className = "test" label = "Email" onChange = {(e) => {this.change_form(e,"email")}} required />
        <br/>
        <TextField margin = "normal" className = "test" label = "Username" onChange = {(e) => {this.change_form(e,"username")}} required />
        <br/>
        <TextField margin = "normal" className = "test" label = "Password" onChange = {(e) => {this.change_form(e,"password")}} required />
        <br/>
        <TextField margin = "normal" className = "test" label = "Confirm password" onChange = {(e) => {this.change_form(e,"confirm_password")}} required />
        <br/>
        <Button type = "submit" color = "primary" variant = "contained" className = "login_btn" onClick = {this.sign_up}>Sign up</Button>
        </form>
        </Paper>
        </div>
      );
  }
}

class Success_login extends React.Component{
  render_data(data)
  {
    return(
      <div className = "float-up">
        <Paper elevation = {1} className = "center_content">
        <h1 align = "center">Your email: {data.email}</h1>
        <h1 align = "center">Your username: {data.username}</h1>
        </Paper>
      </div>
    );
  }
  render(){
    return(
      <div>
      {this.render_data(this.props.data)}
      <div className = "center">
      <Button type = "submit" color = "secondary" variant = "contained" onClick = {this.logout}>Log out</Button>
      </div>
      </div>
      );
    }
}

class Profile extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      data:undefined
    }
    this.logout = this.logout.bind(this);
  }
  logout(){
    fetch("https://lkt-back-end.herokuapp.com/authen_and_autho/logout",{
      method:'GET',
      credentials:'include'
    })
    .then(res => res.text().then(res => alert(res)));
    this.setState({data:undefined});
  }
  async componentDidMount(){
    let res = await fetch("https://lkt-back-end.herokuapp.com/authen_and_autho/profile",{
      method:'GET',
      credentials:'include'
    });
    let res2 = await res.clone();
    try
    {
      res2 = await res2.json();
      this.setState({data:res2});
    }
    catch
    {
      let res3 = await res.text();
      alert(res3);
    }
  }
  render(){
    return(
      (this.state.data)
      ?
      (
        <Success_login data = {this.state.data} />
      )
      :
      (
        <div className = "center">You haven't logged in yet</div>
      )
    );
  }
}


class Home extends React.Component{
  render(){
    return(
      <div>
        <Link to = "/login"><Button variant = "contained">LOG IN</Button></Link>
        <br/>
        <br/>
        <Link to = "/sign_up"><Button variant = "contained">SIGN UP</Button></Link>
        <br/>
        <br/>
        <Link to = "/profile"><Button variant = "contained">PROFILE</Button></Link>
      </div>
    );
  }
}
class App extends React.Component{
  render(){
    return(
      <Router basename={process.env.PUBLIC_URL}>
        <div>
        <Route exact path = "/" component = {Home} />
        <Link className = "HOME" to = "/"><Button variant = "contained" color = "secondary">HOME</Button></Link>
        <Route path = "/login" component = {login} />
        <Route path = "/sign_up" component = {sign_up} />
        <Route path = "/profile" component = {Profile}/>
        </div>
      </Router>
    );
  }
}
export default App;
