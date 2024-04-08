const APIUrl = "http://192.168.43.18:4000/v1";

class APIManager {
    constructor() {
        this.SignedIn = false;
        this.SigninCallback = (b) => { }
        this.token = null;
        this.user = null;
        this.items = null;
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

    ohno() {
        this.user = null;
        this.token = null;
        this.SignedIn = false;
        this.SigninCallback(false);
    }

    signout() {
        this.token = null;
        this.user = null;
        this.SignedIn = false;
        this.SigninCallback(false); // Notify the app that the user has signed out
    }

    async addItem(itemData) {
        if (!this.check()) {
            return 'Failed to add item';
        }
        try {
            const response = await fetch(`${APIUrl}/found`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token.token}` // Include the authentication token in the request header
                },
                body: JSON.stringify(itemData) // Provide the item data in JSON format
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.ohno()
                }
                console.log(await response.json())
                // Handle error based on response status
                return 'Failed to add item';
            }

            console.log('Item added successfully!');
            // Optionally, handle further actions upon successful item addition
            return null; // Return null to indicate success

        } catch (error) {
            console.error('Failed to add item:', error.message);
            return 'Failed to add item'; // Return error message
        }
    }

    async getItems() {
        if (!this.check()) {
            return 'Failed to get items';
        }
        if (this.items != null) {
            return null;
        }
        try {
            const response = await fetch(`${APIUrl}/found/unclaimed`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token.token}` // Include the authentication token in the request header
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.ohno()
                }
                console.log(await response.json())
                // Handle error based on response status
                return 'Failed to get items';
            }

            const i = await response.json();
            this.items = i;
            console.log(this.items)
            // Optionally, handle further actions upon successful item retrieval
            return null; // Return null to indicate success

        } catch (error) {
            console.error('Failed to get items:', error.message);
            return 'Failed to get items'; // Return error message
        }
    }

    async matchingItem(image) {
        if (!this.check()) {
            return [null, 'Failed to get items'];
        }
        try {
            const response = await fetch(`${APIUrl}/found/match`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token.token}` // Include the authentication token in the request header
                },
                body: JSON.stringify({
                    image: image
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.ohno()
                }
                // Handle error based on response status
                return [null, 'Failed to get items'];
            }

            const i = await response.json();
            // Optionally, handle further actions upon successful item retrieval
            return [i, null]; // Return null to indicate success

        } catch (error) {
            console.error('Failed to get items:', error.message);
            return 'Failed to get items'; // Return error message
        }
    }

    check() {
        if (this.user == null || this.token == null || !this.SignedIn) {
            this.ohno();
            return false;
        }
        return true;
    }
}
const API = new APIManager();
export default API;
