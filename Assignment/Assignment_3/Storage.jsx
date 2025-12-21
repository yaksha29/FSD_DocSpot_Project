import { createContext, useState } from "react";

export const Storage = createContext();
export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  return (
    <Storage.Provider value={{ profiles, setProfiles }}>
      {children}
    </Storage.Provider>
  );
};
