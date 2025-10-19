import React from 'react'

const ForgotPassword = ({ status }) => {
  return (
    <div>
      <h1>Forgot Password</h1>
      {status && <div>{status}</div>}
      <p>Enter your email to receive a password reset link.</p>
    </div>
  )
}

export default ForgotPassword
