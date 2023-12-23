import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class ApiClient {
    constructor(resource) {
        this.resource = resource;
    }

    get url() {
        return `${API_URL}/${this.resource}`;
    }

    get(postfix = '') {
        return axios.get(this.url + postfix);
    }

    show(id, postfix = '') {
        return axios.get(`${this.url}/${id}${postfix}`);
    }

    create(data, postfix = '') {
        console.log(this.url + postfix, data);
        return axios.post(this.url + postfix, data);
    }

    update(id, data, postfix = '') {
        return axios.put(`${this.url}/${id}${postfix}`, data);
    }

    delete(id, postfix = '') {
        return axios.delete(`${this.url}/${id}${postfix}`);
    }
}

export default ApiClient;