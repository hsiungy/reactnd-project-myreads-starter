import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: []
        }

    }

    async componentDidMount() {
        try {
            const books = await BooksAPI.getAll();
            this.props.addBooks(books);
        } catch(err) {
            console.log(err);
        }
    }

    handleChange = async e => {
        try {
            const queryVal = e.target.value;
            this.setState({query: queryVal});
            if (queryVal) {
                const results = await BooksAPI.search(queryVal);
                if (results.error) {
                    this.setState({books: []});
                } else {
                    this.setState({books: results});
                }
            } else {
                this.setState({books: []});
            }
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
              <ol className="books-grid">
                {this.state.query && 
                    this.state.books.map(book => {
                        const hasShelf = this.props.books.find(
                            foundBook => foundBook.id === book.id
                        )
                        return(
                            <Book key={book.id} {...book} shelf={hasShelf ? hasShelf.shelf : "none"} moveBook={this.props.moveBook}/>
                        )
                    })
                }

                {this.state.query === "" && <h1>No books found</h1>}
              </ol>
            </div>
          </div>
        )
    }
}