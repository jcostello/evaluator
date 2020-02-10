import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, Alert, Button } from 'antd'
import { Form, Input } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { setJWT } from './../utils/userAuthentication'

const SignIn = ({ isSubmitting, setSubmitting, history }) => {
  const [error, setError] = useState('')

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      const { data } = await axios.post('/api/v1/users/sign_in', values)

      setJWT(data.token)
      
      history.push('/')
    } catch (e) {
      setSubmitting(false)
      setError('Invalid Email or Password')
    }
  }

  const formConfig = {
    initialValues: { email: '', password: '' },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
    validationSchema
  }

  return (
    <Row type='flex' justify='center' align='middle' style={{height: '100%'}}>
      <Col span='4'> 
        
        <Formik {...formConfig }>
          {({isSubmitting}) => (
            <Form>
              { error ? <Alert message={error} type="error" /> : null }

              <Form.Item name='email'>
                <Input
                  name='email'
                  id= 'email'
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item name='password'>
                <Input
                  type='password'
                  name='password'
                  id= 'password'
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item name='forgot-password'>
                <a className="login-form-forgot">
                  Forgot password
                </a>

                <Button type="primary" htmlType="submit" id='submit' className="login-form-button" disabled={isSubmitting}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default withRouter(SignIn)
