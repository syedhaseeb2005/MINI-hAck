import {createUserWithEmailAndPassword,auth,setDoc,doc,db} from './firebaseconfig.js'

const SignupFirstname = document.getElementById('SignupFirstname')
const SignupLastname = document.getElementById('SignupLastname')
const Signupemail = document.getElementById('Signupemail')
const Signuppassword = document.getElementById('Signuppassword')
const signupBtn = document.getElementById('signupBtn')
const RepeatPass = document.getElementById('Repeat-pass').value

console.log(SignupFirstname);
console.log(SignupLastname);
console.log(Signupemail);
console.log(Signuppassword);
console.log(signupBtn);
console.log(RepeatPass);

async function signbtnhandler(){
    // console.log(signuphandler)
    try {
        const response = await  createUserWithEmailAndPassword(auth, Signupemail.value,Signuppassword.value)
        console.log(response);
        if(response){
            console.log(response.user)
            adduserhandler(response.user.uid)
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        
        SignupFirstname.value = ''
        SignupLastname.value = ''
        Signupemail.value = ''
        Signuppassword.value = ''
    }
}
async function adduserhandler(uid){
    try {
        const response = await setDoc(doc(db, "users", uid), {
           SignupFirstname : SignupFirstname.value,
           SignupLastname : SignupLastname.value,
           Signupemail : Signupemail.value,
           Signuppassword : Signuppassword.value,
           uid
        });
        alert("you are signup success")
        window.location.href='../Login page/index.html'
        
    } catch (e) {
        console.error(e);
    }
}   




signupBtn.addEventListener('click',signbtnhandler)