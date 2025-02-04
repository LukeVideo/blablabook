// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#46181
function checkEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            // Regex qui vérifie que l'adresse mail comporte bien les symboles autorisés.  
            // Une première partie avant le arobase (@) qui correspond à l'adresse de l'utilisateur
            //  Seconde partie après l'arobase qui constitue le nom de domaine
            // Le nom de domaine peut être une adresse IP ou un nom de domaine standard
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

    
export default checkEmail;