class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(clientId) {
        let regex = /^[0-9]{6}$/;
        if (!regex.test(clientId)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }
        this._clientId = clientId;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        let regex = /^[a-z]+@[a-z\.]+$/;
        if (!regex.test(email)) {
            throw new TypeError('Invalid e-mail');
        }
        this._email = email;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (firstName.length < 3 || firstName.length > 20) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        }
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(firstName)) {
            throw new TypeError('First name must contain only Latin characters');
        }
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        if (lastName.length < 3 || lastName.length > 20) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(lastName)) {
            throw new TypeError('Last name must contain only Latin characters');
        }
        this._lastName = lastName;
    }
}
