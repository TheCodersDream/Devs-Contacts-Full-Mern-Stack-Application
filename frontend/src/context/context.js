import React, {Component} from 'react';
import * as ActionTypes from './actions';
import {contactFilter} from '../util/contact-filter'

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_CONTACT:
            state.contacts =  state.contacts.filter(contact => contact.id !== action.payload );
            state.filterContacts = state.contacts;
            return {
                ...state
            };
        case ActionTypes.ADD_CONTACT:
            state.contacts = [...state.contacts, action.payload];
            state.filterContacts = state.contacts;
            return {
                ...state,
            };
        case ActionTypes.UPDATE_CONTACT:
            state.contacts = state.contacts.map(contact => {
                return contact.id === action.payload.id ? (contact === action.payload): contact
            });
                state.filterContacts = state.contacts
            return {
                ...state,

            };
        case ActionTypes.FILTER_CONTACT:
            return {
                ...state,
                filterContacts: contactFilter(state.contacts, action.payload)
            };
        default:
            return state;
    }
};


export class Provider extends Component {
    state = {
        contacts: [],
        filterContacts: [],
        dispatch: action => this.setState(state => reducer(state, action) )
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({contacts:res, filterContacts: res })
            })
    }
    render(){
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }

}


export const Consumer = Context.Consumer;