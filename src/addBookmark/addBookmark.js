import React, { Component } from 'react';
import './addBookmark.css';

class AddBookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            description: '',
            rating: 1
        }
    }
    valueChanged(key, value) {
        this.setState({
            [key]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const bookmark = (({title, url, description, rating}) => ({title, url, description, rating}))(this.state);
        const url ='https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
        const options = {
            method: 'POST',
            body: JSON.stringify(bookmark),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer $2a$10$ZhdeJefcb.5sx/DCmO/n8u5sJLcARAdbHw9tfm1mevGRq3s1.5DpW"
            }
        }
        fetch(url, options)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong')
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    title: '',
                    url: '',
                    description: '',
                    rating: 1
                });
                this.props.handleAdd(bookmark);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }

    render() {
        const error = this.state.error ? <div className="error">{this.state.error}</div> : '';

        return (
            <div className="addbookmark">
                <h2>Add Bookmark</h2>
                { error }
                <form className="addbookmark__form" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={e => this.valueChanged('title', e.target.value)} />
                    <label htmlFor="url">Url:</label>
                    <input type="text" name="url" id="url" placeholder="url" value={this.state.url} onChange={e => this.valueChanged('url', e.target.value)} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" placeholder="description" value={this.state.description} onChange={e => this.valueChanged('description', e.target.value)} />
                    <label htmlFor="rating">Rating: </label>
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        min="1"
                        max="5" 
                        value={this.state.rating} onChange={e => this.valueChanged('rating', e.target.value)} />
                    
                    <div className="addbookmark__buttons">
                        <button id="btn-cancel" onClick={e => this.props.showForm(false)}>Cancel</button>
                        <button type="submit" id="btn-save">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddBookmark;