import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

export default class Search extends Component {
    handleChange = async e => {
        try {
            const query = e.target.value;
            const result = await BooksAPI.search(query);
            console.log(result);
        } catch(err) {
            console.log(err);
        }
    }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}