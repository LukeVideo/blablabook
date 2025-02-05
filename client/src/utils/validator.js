const blablaregex = {

    // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
    checkEmail(email) {
        return String(email)
        .toLowerCase()
        .match(
            // Regex qui vérifie que l'adresse mail comporte bien les symboles autorisés.  
            // Une première partie avant le arobase (@) qui correspond à l'adresse de l'utilisateur
            //  Seconde partie après l'arobase qui constitue le nom de domaine
            // Le nom de domaine peut être une adresse IP ou un nom de domaine standard
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        
    },
    checkPassword(password){
        return String(password)
        .match(
            // verify string length at least 12 caracters
            // At least 1 uppercase letters
            // at least 1 lowercase letters
            // at least 1 special case letter
            // at least 1 digit
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9_]+).{12,}$/
            
            
        )    
    }
    
}

    
export default blablaregex;