import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import Logo from '../images/warbler-logo.png';

class Navbar extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout(); //must be passed in mapDispatchToProps
    }

    render() {
        return(
            <nav className="navbar navbar-expand">
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img src={Logo} alt='Warbler Home' />
                        </Link>
                    </div>
                    {/*  if the user is authenticated display Log out */ }
                    { this.props.currentUser.isAuthenticated ? (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}> New message </Link>
                            </li>
                            <li>
                                <a onClick={this.logout}>Log out</a>
                            </li>

                        </ul>
                        )
                        : (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/signup'>Sign up</Link>
                            </li>
                            <li>
                                <Link to='/signin'>Log in</Link>
                            </li>
                        </ul>
                        )
                    }   
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

// add logout to mapDispatchToProps
export default connect(mapStateToProps, { logout })(Navbar);