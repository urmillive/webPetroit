import ApiClient from "./ApiClient";

class StudentsAPI extends ApiClient {
    constructor() {
        super('students');
    }

    updateProfile(id, body) {
        return this.update(id, body, '/profile');
    }
}

export default new StudentsAPI;