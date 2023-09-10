import React, { createContext } from "react";

interface UserHeaderContextType {
  header: string | null;
  setHeader: React.Dispatch<React.SetStateAction<string | null>> | null;
}

const IUserHeaderContextState = {
  header: null,
  setHeader: null,
};
const UserHeaderContext = createContext<UserHeaderContextType>(
  IUserHeaderContextState
);

export { UserHeaderContext };
