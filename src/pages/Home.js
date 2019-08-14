import React, { Component } from 'react';
import Bookshelf from '../components/Bookshelf';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    async componentDidMount() {
        try {
            const books = await BooksAPI.getAll();
            this.props.addBooks(books);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Bookshelf title="Currently Reading" books={this.props.currentlyReading} moveBook={this.props.moveBook}/>
                <Bookshelf title="Want to Read" books={this.props.wantToRead} moveBook={this.props.moveBook}/>
                <Bookshelf title="Read" books={this.props.read} moveBook={this.props.moveBook}/>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
        )
    }
}