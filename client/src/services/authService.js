export default class AuthService {
    constructor(request) {
        this.request = request;
        console.log("AuthService initialized with request:", this.request);
    };

    // register user
    registerUser(values) {
        return this.request.post("auth/register", values);
    };

    // login user
    loginUser(values) {
        return this.request.post("auth/login", values);
    };

    // check user's auth status
    checkUserAuth() {
        return this.request.get("auth/check-auth");
    };

    // logout user
    logoutUser() {
        return this.request.get("auth/logout");
    };
};