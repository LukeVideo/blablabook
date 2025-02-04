import argon2 from 'argon2';


const blablapass = {

    
    async hashPassword(password) {
        try {
            // Hash the password with Argon2
            const hashedPassword = await argon2.hash(password);
            console.log("Hashed Password:", hashedPassword);
            return hashedPassword;
        } catch (err) {
            console.error("Error hashing password:", err);
        }
    },
    
    // // Usage
    // hashPassword("your_password_here");
    
    
    async verifyPassword(hashedPassword, inputPassword) {
        try {
            if (await argon2.verify(hashedPassword, inputPassword)) {
                console.log("Password is valid!");
            } else {
                console.log("Password is invalid!");
            }
        } catch (err) {
            console.error("Error verifying password", err);
        }
    }
}
    
export default blablapass;