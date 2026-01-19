function showReg(){
login.style.display="none";
register.style.display="block";
}

function showLogin(){
login.style.display="block";
register.style.display="none";
}

function register(){

if(!name.value||!place.value||!email.value||!pass.value){
alert("املأ كل البيانات");
return;
}

if(pass.value.length<1||pass.value.length>8){
alert("كلمة السر من 1 لـ 8");
return;
}

let user={
name:name.value,
place:place.value,
email:email.value,
pass:pass.value,
role:role.value
};

localStorage.setItem("user",JSON.stringify(user));
alert("تم إنشاء الحساب");
showLogin();
}

function login(){

let data=JSON.parse(localStorage.getItem("user"));

if(!data){
alert("مفيش حساب");
return;
}

if(lEmail.value==data.email && lPass.value==data.pass){
localStorage.setItem("login",JSON.stringify(data));
location.href="dashboard.html";
}else{
alert("بيانات غلط");
}
}