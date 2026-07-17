import React, { createContext, useContext, useState } from 'react';

const SOSContext = createContext();

export const SOSProvider = ({ children }) => {
  const [sosRequest, setSOSRequest] = useState(null);

  // Create a new SOS request
  const broadcastSOS = (request) => {
    setSOSRequest({
      id: Date.now().toString(),
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
      ...request,
    });
  };

  // Donor accepts the SOS
  const acceptSOS = (donor) => {
    if (!sosRequest) return;

    setSOSRequest({
      ...sosRequest,
      status: 'Accepted',
      acceptedBy: donor,
    });
  };

  // Remove the SOS (used after completion/cancel)
  const clearSOS = () => {
    setSOSRequest(null);
  };

  return (
    <SOSContext.Provider
      value={{
        sosRequest,
        broadcastSOS,
        acceptSOS,
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