import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authProvider } from '../../../src/authProvider';
import logo from './logo.png';
import './login.css';
import { AuthPage } from '@refinedev/antd';
import { Form, Input, Button, Checkbox} from 'antd';
const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLoginCredentials = async (values) => {
      try {
        await authProvider.login({ username: values.email, password: values.password });
        navigate('/supersecret-admin-panel-a');
      } catch (error) {
        setErrorMessage('Invalid login credentials');
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <AuthPage
        type="login"
        title={false}
        registerLink={false}
        forgotPasswordLink={false}
        // forgotPasswordLink={
        //   <span
        //     onClick={() => navigate('/forgot-password')}
        //     style={{
        //       color: '#4096FF',
        //       textDecoration: 'none',
        //       cursor: 'pointer',
        //     }}
        //     aria-label="Click to reset your password"
        //   >
        //     Forgot Password?
        //   </span>
        // }
        rememberMe={
          <div style={{ fontSize: '1px' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </div>
        }
        contentProps={{
          title: 'Welcome Back !',
          styles: {
            header: {
              color: '#4096FF',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              width: '100%',
              textAlign: 'center',
              fontSize: 'xx-large',
            },
          },
        }}
        renderContent={(content) => (
          <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="logo-container mb-6">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div>{content}</div>
          </div>
        )}
        formProps={{
          onFinish: handleLoginCredentials,
          onFinishFailed: (errorInfo) => {
            console.log('Failed:', errorInfo);
          },
        }}
      >
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input
            placeholder="Email"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
          >
            Login
          </Button>
        </Form.Item>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </AuthPage>
    );
  };
  
  export default Login;