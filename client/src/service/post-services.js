import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:8000/api/'
        })
    }


    postPost = (postform) => {
        return this.service.post('post', postform, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    getAllPosts = () => {

        return this.service.get('getAllPosts', { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log('Error', err))
    }

    handleUpload = uploadData => {
        return this.service.post('upload', uploadData, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err));
    }
}