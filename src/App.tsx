
import React, {FC} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {TodoContextProvider} from "./components/TodoContext";
import {TodoList} from "./components/TodoList";
import styled, {ThemeProvider} from "styled-components";

const StyledApp = styled.div`
&.app {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
}
`;

export const App: FC = () => {
  return (
          <TodoContextProvider>
              <StyledApp className="app">
                  <Header/>
                  <TodoList/>
              </StyledApp>
          </TodoContextProvider>
  );
}
