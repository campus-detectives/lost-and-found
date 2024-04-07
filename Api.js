const APIUrl = "http://192.168.169.18:4000/v1";

class APIManager {
    constructor() {
        this.SignedIn = false;
        this.SigninCallback = (b) => { }
        this.token = null;
        this.user = null;
    }

    async register(username, password) {


        try {
            const response = await fetch(`${APIUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                if (response.status === 422) {
                    // Handle Unprocessable Entity error
                    const errorData = await response.json();
                    return errorData.error;
                } else {
                    return 'Failed to register';
                }
            }

            console.log('User registered successfully!');
            // Optionally, you can handle further actions upon successful registration
            return null; // Return null to indicate success

        } catch (error) {
            console.error('Registration failed:', error.message);
            return 'Registration failed'; // Return error message
        }
    }

    async signin(username, password) {


        try {
            const response = await fetch(`${APIUrl}/tokens/authentication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                if (response.status === 422) {
                    // Handle Unprocessable Entity error
                    const errorData = await response.json();
                    return errorData.error;
                } else {
                    return 'Failed to sign in';
                }
            }

            // Sign in successful
            const tokenData = await response.json();
            console.log(tokenData);
            // Store tokenData or perform further actions upon successful sign in
            this.token = tokenData.authentication_token;
            this.user = tokenData.user;
            this.SignedIn = true; // Update SignedIn status upon successful sign in
            this.SigninCallback(true); // Notify the app that the user has signed in
            return null; // Return null to indicate success

        } catch (error) {
            console.error('Sign in failed:', error.message);
            return 'Sign-in failed'; // Return error message
        }
    }

    signout() {
        this.token = null;
        this.user = null;
        this.SignedIn = false;
        this.SigninCallback(false); // Notify the app that the user has signed out
    }
}

const API = new APIManager();
export default API;
