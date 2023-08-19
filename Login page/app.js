import {signInWithEmailAndPassword,auth} from '../firebaseconfig.js'

const loginEmail = document.getElementById('loginEmail') 
const loginPassword = document.getElementById('loginPassword')
const LoginBtn = document.getElementById('LoginBtn')

console.log(loginEmail);
console.log(loginPassword);
console.log(LoginBtn);

// const successfulLogin = true;
async function LoginBtnHanlder(){
    console.log(LoginBtnHanlder);
    const response = await signInWithEmailAndPassword(auth, loginEmail.value,loginPassword.value)
        try{
            const users = response.user;
            if(users){
                window.location.href = '../dashboard/dashboardindex.html'
            }
            alert('Welcome You Are Loged in')
            
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            
        }
    
    }
    

//     if (successfulLogin) {
//         redirectToDashboard();
//     }


// function redirectToDashboard() {
//     // Check if the user is already logged in
//     // For demonstration, assume isLoggedIn is a variable indicating login status
//     const isLoggedIn = true;

//     if (isLoggedIn) {
//         window.location.href = "../dashboard/dashboardindex.html";
//     }
//     else{
//         window.location.href = "../Login page/index.html"
//     }
// }




LoginBtn.addEventListener('click',LoginBtnHanlder)