function validateEmail(email) {
   	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   	return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    return String(phone).trim().length == 10 && /^d+$/.test(String(phone).trim());
}
