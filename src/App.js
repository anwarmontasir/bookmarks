import React, { Component } from 'react';
import './App.css';

import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

const bookmarks = [
  {
    title:"Google",
    url:"http://www.google.com", 
    rating:"4", 
    description:"A popular search engine"
    },
    {
      title:"Taco Bell",
      url:"http://ta.co", 
      rating:"2", 
      description:"Yo quiero"
    }
]

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AddBookmark />
        <BookmarkApp bookmarks={bookmarks} />
      </div>
    );
  }
}

export default App;