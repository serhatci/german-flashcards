import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export function DataProvider({ children }) {
  const { currentUser } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [titles, setTitles] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userID: currentUser ? currentUser.uid : "guest",
      }),
    };

    setLoading(true);
    fetch("/api", options)
      .then((response) => response.json())
      .then((data) => setupTitles(data))
      .catch((error) => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, [currentUser]);

  function setupTitles(data) {
    if (!data.titles) throw new Error(data.message);
    for (let title in data) {
      localStorage.setItem(title, JSON.stringify(data[title]));
    }
    setTitles(JSON.parse(localStorage.getItem("titles")));
    setFlashcards(JSON.parse(localStorage.getItem("flashcards")));
    setUsername(JSON.parse(localStorage.getItem("username")));
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        setLoading,
        fetchError,
        setFetchError,
        titles,
        setTitles,
        flashcards,
        setFlashcards,
        username,
        setUsername,
      }}>
      {children}
    </DataContext.Provider>
  );
}
