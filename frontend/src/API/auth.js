import ApiClient from "./ApiClient";

class AuthAPI extends ApiClient {
    constructor() {
        super('auth');
    }

    login(body) {
        return this.create(body, '/login');
    }

    signup(body) {
        return this.create(body, '/signup');
    }
}

export default new AuthAPI;