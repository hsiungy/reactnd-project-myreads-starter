import React, { Component } from 'react';

export const MyContext = React.createContext();

export default class index extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            currentlyReading: [],
            wantToRead: [],
            read: [],
            addBooks: books => {
                const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
                const wantToRead = books.filter(book => book.shelf === 'wantToRead');
                const read = books.filter(book => book.shelf === 'read');
                this.setState({books, currentlyReading, wantToRead, read});
            },
            moveBook: (book, destShelf, allShelves) => {
                console.log(allShelves);
                const movedBooks = this.state.books.map(allBooks => {
                    const foundID = allShelves[destShelf].find(bookID => bookID === allBooks.id);
                    if (foundID) {
                        allBooks.shelf = destShelf;
                    }
                    return allBooks;
                });
                this.state.addBooks(movedBooks);
            }
        }
    }
    render() {
        return (
            <MyContext.Provider value={{...this.state}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}