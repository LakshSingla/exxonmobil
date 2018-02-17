var leader_name = document.getElementById('leader_name').value;
var leader_phone = document.getElementById('leader_phone').value;
var leader_mail = document.getElementById('leader_mail').value;
var mem1_name = document.getElementById('mem1_name').value;
var mem1_phone = document.getElementById('mem1_phone').value;
var mem1_mail = document.getElementById('mem1_mail').value;
var mem2_name = document.getElementById('mem2_name').value;
var mem2_phone = document.getElementById('mem2_phone').value;
var mem2_mail = document.getElementById('mem2_mail').value;
var college = document.getElementById('problem').value;

var selectColleges = document.getElementById('problem');

// var BASE_URL = 'http://192.168.43.141:8000/exxonmobil';
var BASE_URL = "https://bits-apogee.org/2018/exxonmobil";


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
    college = document.getElementById('problem').value;
}

function validateCollege() {
    return college !== 'notAValue';
}

function isFormValid(){
    updateData();

    // console.log(leader_name, leader_phone, leader_mail, mem1_name, mem1_phone, mem1_mail);

    var boolIsValidForm = false;
    if(validateEmail(leader_mail) &&
    validatePhone(leader_phone) &&
    validateEmail(mem1_mail) &&
    validatePhone(mem1_phone) &&
    validateCollege(college)
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
    
    // document.getElementById('submitBtn').disabled = true;
    var sendData = {};
    if(isFormValid()){
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').style.backgroundColor = "#afaaf7";
        sendData.college_id = college;
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
        $.ajax({
            type: 'POST',
            url : BASE_URL + '/register_exxon/',
            data: sendData,
            complete: function(xhr, textStatus) {
                // console.log(xhr);
                // console.log(textStatus);
                document.getElementById("register-message").style.display = "block";
                document.getElementById("register-message").textContent = String(xhr.responseJSON.message);
                console.log(xhr.responseJSON.responseJSON);
                // document.getElementById('submitBtn').disabled = true;
                // document.getElementById('submitBtn').style.backgroundColor = "#afaaf7";
            },
            error: function(){
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('submitBtn').style.backgroundColor = "#514d8e";
            }
        });
    }
    else{
        document.getElementById("register-message").style.display = "block";
        document.getElementById("register-message").textContent = "Data is incorrect";
        console.log("Data is incorrect");
    }
    // console.log(sendData);

}

$.ajax({
    type: 'GET',
    url :  BASE_URL + '/college_list',
    complete : function(xhr, textStatus){
        // console.log(xhr.responseJSON);
        // console.log(textStatus);
        xhr.responseJSON.colleges.forEach(function(elem){
            // console.log(elem);
            var option = document.createElement('option');
            option.setAttribute('value', String(elem.id));
            option.textContent = elem.name;
            selectColleges.appendChild(option);
        });

    }
});
