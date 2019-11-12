import React, { Component }  from 'react';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            profileImageUrl: ''
        };
    }

    handleSubmit = e => {
       e.preventDefault();
       const authType = this.props.signUp ? "signup" : "signin"; 
        this.props.onAuth(authType, this.state)
        .then(()=> {
            // on submit render Home component
            // redirect to '/' using react router history Object
           this.props.history.push('/');
        }).catch(() => {
            return;
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        const { email, username, password, profileImageUrl } = this.state
        const {
            heading, 
            buttonText, 
            signUp,
            errors,
            history, // you get it from react-router
            removeError
        } = this.props;

        // history Object that comes from React Router as this.props.history
        // listening for any change in the route
        history.listen( () => {
            removeError();
        });

        return(
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {/* {if there is any error message (that is passed in props), display it} */}
                            { errors.message && <div className='alert alert-danger'> {errors.message} </div> }
                            <label htmlFor="email">Email:
                            </label>
                            <input className='form-control'
                             id='email'
                              name='email'
                               onChange={this.handleChange} 
                               value={email}
                                type="text"
                                />
                            <label htmlFor="password">Password:
                            </label>
                            <input className='form-control'
                             id='password'
                              name='password'
                               onChange={this.handleChange}
                                type="password"
                                />
                            {/* if there is a prop of signUp add additional inputs */}
                            { signUp && (
                                <div>
                                    <label htmlFor="username">Username:
                                    </label>
                                    <input className='form-control'
                                        id='username'
                                        name='username'
                                        onChange={this.handleChange} 
                                        value={username}
                                        type="text"
                                    />
                                        <label htmlFor="profilImageUrl">Image URL:
                                        </label>
                                        <input className='form-control'
                                        id='profileImageUrl'
                                        name='profileImageUrl'
                                        onChange={this.handleChange}
                                        type="profileImageUrl"
                                        value={profileImageUrl}
                                    /> 
                                </div>  
                            )}
                            <button type='submit' className='btn btn-primary btn-block btn-lg'>
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}