export default class FormatUtils {
    validateEmail = (email) => {
        const regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        return email.match(regex);
    };
}