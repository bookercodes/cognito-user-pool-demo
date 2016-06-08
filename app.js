AWSCognito.config.region = 'us-east-1'
AWSCognito.config.credentials = new AWSCognito.CognitoIdentityCredentials({
  IdentityPoolId: ''
})
AWSCognito.config.update({
  accessKeyId: 'anything',
  secretAccessKey: 'anything'
})
const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
  UserPoolId: '',
  ClientId: ''
})

const r = React.createElement

const SignUpForm = React.createClass({
  signUp (application) {
    const attributes = [
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
        Name: 'email',
        Value: application.email
      }),
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
        Name: 'website',
        Value: application.website
      })
    ]
    userPool.signUp(application.username, application.password, attributes, null, (err, result) => {
      if (err) {
        alert(`Something went wrong: ${err.message}`)
        console.error('userPool.signUp() err:', err)
      } else {
      alert(`Hello, ${result.user.getUsername()}. Your account has been created.`)
      }
    })
  },

  onSubmit (e) {
    e.preventDefault()
    this.signUp({
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      website: ReactDOM.findDOMNode(this.refs.website).value
    })
  },

  render () {
    return r('form', { onSubmit: this.onSubmit },
      r('label', 'Email'),
      r('input', { type: 'email', placeholder: 'Email', ref: 'email' }),
      r('label', 'Username'),
      r('input', { type: 'text', placeholder: 'Username', ref: 'username' }),
      r('label', 'Website'),
      r('input', { type: 'text', placeholder: 'Website', ref: 'website' }),
      r('label', 'Password'),
      r('input', { type: 'password', placeholder: 'Password', ref: 'password' }),
      r('input', { type: 'submit', value: 'Sign up' })
    )
  }
})

ReactDOM.render(
  r(SignUpForm),
  document.getElementById('root'))
