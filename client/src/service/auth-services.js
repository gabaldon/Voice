import axios from 'axios'

export default class services {

    constructor() {
        // baseURL: 'http://localhost:8000/api/',
        this.service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true
        })
    }

    signup = (username, password) => {
        return this.service.post('signup', { username, password })
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('login', { username, password })
            .then(response => response.data)
           
    }

    logout = () => {
        return this.service.post('logout', {})
            .then(response => response.data)
            
    }

    loggedin = () => {
        return this.service.get('loggedin')
            .then(response => response.data)
            
    }
}