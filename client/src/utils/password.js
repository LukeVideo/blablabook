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
    
    // hashPassword("your_password_here");
    
    
    async verifyPassword(hashedPassword, inputPassword) {
        try {
            if (await argon2.verify(hashedPassword, inputPassword)) {
                return true;
            }
            return false
            
        } catch (err) {
            console.error("Error : Can not compare both passwords", err);
        }
    },
    async checkConfirmPassword(pass, confirmPass) {
        if (pass === confirmPass) {
            return blablapass.hashPassword(pass)
        }

        return false;

    }
}
    
export default blablapass;