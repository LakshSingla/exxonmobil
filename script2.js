var Member2 = document.getElementById('Member2');
var addMemberBtn = document.getElementById('addMemBtn');
var isMember2 = false;
addMemberBtn.addEventListener('click', function(){
    isMember2 = isMember2 ? false : true;
    if(isMember2){
        Member2.style.display = "block";
        addMemberBtn.setAttribute("value", "Remove member");
    }
    else{
        Member2.style.display = "none";
        addMemberBtn.setAttribute("value", "Add member");
    }
});
