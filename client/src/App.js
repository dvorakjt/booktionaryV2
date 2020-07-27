import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages
import SearchBooks from './Pages/SearchBooks/SearchBooks';
import MyBooks from './Pages/MyBooks/MyBooks';
import NoMatch from './Pages/NoMatch/NoMatch';
import ViewBook from './Pages/ViewBook/ViewBook';

//Global Store!
import { BookStoreProvider } from './Utils/BookStore';

function App() {
  return (
    <div className="App">
      <BookStoreProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <SearchBooks />
            </Route>
            <Route exact path="/mybooks">
              <MyBooks />
            </Route>
            <Route exact path="/viewbook">
              <ViewBook />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </BookStoreProvider>
    </div>
  );
}

export default App;
