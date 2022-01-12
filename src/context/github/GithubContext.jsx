import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_API_LINK;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    dispatch({
      type: "FETCH_USERS",
      payload: data
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    fetchUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext;