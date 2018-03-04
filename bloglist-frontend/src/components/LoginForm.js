import React from 'react'
const LoginForm = ({props}) => (
    <div>
    <h2>Log in with actual credentials</h2>
    <form onSubmit={props.logIn}>
        <div>
            username: <input type='text' name='loginuser' value={props.state.loginuser} onChange={props.handleLoginFieldChange} />
            password: <input type='password' name='loginpass' value={props.state.loginpass} onChange={props.handleLoginFieldChange} />
            <button type="submit">login</button>
        </div>
    </form>
</div>
)

export default LoginForm