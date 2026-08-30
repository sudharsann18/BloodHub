import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const SOSContext = createContext();

export const SOSProvider = ({ children }) => {

  const [sosRequest, setSOSRequest] = useState(null);

  // Store the REAL SOS returned by backend
  const broadcastSOS = (request) => {

    setSOSRequest(request);

  };

  // Update requester-side SOS when backend data is received
  const updateSOS = (request) => {

    setSOSRequest(request);

  };

  // Remove SOS after completion/cancel
  const clearSOS = () => {

    setSOSRequest(null);

  };

  return (
    <SOSContext.Provider
      value={{
        sosRequest,
        broadcastSOS,
        updateSOS,
        clearSOS,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
};

export const useSOS = () => {

  return useContext(SOSContext);

};