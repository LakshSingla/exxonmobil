var leader_name = document.getElementById('leader_name').value;
var leader_phone = document.getElementById('leader_phone').value;
var leader_mail = document.getElementById('leader_mail').value;
var mem1_name = document.getElementById('mem1_name').value;
var mem1_phone = document.getElementById('mem1_phone').value;
var mem1_mail = document.getElementById('mem1_mail').value;
var mem2_name = document.getElementById('mem2_name').value;
var mem2_phone = document.getElementById('mem2_phone').value;
var mem2_mail = document.getElementById('mem2_mail').value;

var URL = '192.168.43.141:8000/exxonmobil';


// function validateEmail(email) {
//    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    	return re.test(String(email).toLowerCase());
// }
//
// function validatePhone(phone) {
//     return String(phone).trim().length == 10 && /^d+$/.test(String(phone).trim());
// }

function updateData(){
    leader_name = document.getElementById('leader_name').value;
    leader_phone = document.getElementById('leader_phone').value;
    leader_mail = document.getElementById('leader_mail').value;
    mem1_name = document.getElementById('mem1_name').value;
    mem1_phone = document.getElementById('mem1_phone').value;
    mem1_mail = document.getElementById('mem1_mail').value;
    mem2_name = document.getElementById('mem2_name').value;
    mem2_phone = document.getElementById('mem2_phone').value;
    mem2_mail = document.getElementById('mem2_mail').value;
}

function isFormValid(){
    updateData();

    // console.log(leader_name, leader_phone, leader_mail, mem1_name, mem1_phone, mem1_mail);

    var boolIsValidForm = false;
    if(validateEmail(leader_mail) &&
    validatePhone(leader_phone) &&
    validateEmail(mem1_mail) &&
    validatePhone(mem1_phone)
    ){
    boolIsValidForm = true;
}
    if(isMember2) {
        if(!validateEmail(mem2_mail) ||
            !validatePhone(mem2_phone)){
            boolIsValidForm = false;
        }
    }
    return boolIsValidForm;
}

function submitData(){
    var sendData = {};
    if(isFormValid()){
        sendData.leader_name = leader_name;
        sendData.leader_phone = leader_phone;
        sendData.leader_email = leader_mail;
        sendData.names = [];
        sendData.names.push(mem1_name);
        sendData.phones = [];
        sendData.phones.push(mem1_phone);
        sendData.email_ids = [];
        sendData.email_ids.push(mem1_mail);
        if(isMember2){
            sendData.names.push(mem2_name);
            sendData.phones.push(mem2_phone);
            sendData.email_ids.push(mem2_mail);
        }
    }
    else{
        console.log("Data is incorrect");
    }
    console.log(sendData);
    $.ajax({
        type: 'POST',
        url : URL,
        data: sendData
    });
}
