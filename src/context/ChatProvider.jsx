// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './ChatContext';
import { requestData } from '../services/requests';

function ChatProvider({ children }) {

  const [nameUser, setNameUser] = useState({});
  const getUser = async () => {
    const user = await requestData('/me');
    setNameUser(user);
  }

  const contextValue = useMemo(() => ({
    getUser,
    nameUser,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [nameUser]);

  return (
    <ChatContext.Provider value={ contextValue }>
      { children }
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatProvider;
