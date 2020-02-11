import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Row, Col, Typography, Alert } from 'antd'
import { GoogleLogin } from 'react-google-login';

import { setJWT } from './../utils/userAuthentication'

const Title = Typography.Title

const SignIn = ({ history }) => {
  const [error, setError] = useState('')

  // const handleSubmit = async (values, {setSubmitting}) => {
  //   try {
  //     const { data } = await axios.post('/api/users/sign_in', values)

  //     setJWT(data.token)
      
  //     history.push('/')
  //   } catch (e) {
  //     setSubmitting(false)
  //     setError('Invalid Email or Password')
  //   }
  // }

  const responseGoogle = async ({profileObj}) => {
    try {
      const { data } = await axios.post('/api/users/sign_in', { email: profileObj.email })

      setJWT(data.token)

      history.push('/')
    } catch (e) {
      setError('User doesn\'t exist in the system')
    }
  }

  return (
    <>
      { error ? <Alert type='error' message={error} closable showIcon/> : null }
      <Row type='flex' justify='center' align='middle' style={{height: '100%'}}>
        <Col> 
          <Title>Welcome to Evaluator</Title>
          <Row type='flex' justify='center' align='middle' style={{height: '100%'}}>
            <GoogleLogin
              clientId="753581918384-h8h02refd1h49vrg67t9evem7nghpqk6.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default withRouter(SignIn)
