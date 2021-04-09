import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(false);
  setTimeout(() => {
    setAlert(false);
  }, 3000);
  return (
    <Alert hidden={alert} variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
