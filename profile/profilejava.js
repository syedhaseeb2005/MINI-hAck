import {signOut,auth} from '../firebaseconfig.js'


const LogoutBtn = document.getElementById('LogoutBtn')


async function LogoutBtnHanlder(){
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Logout successfully")

        window.location.href = '../Login page.index.html'
        
    }).catch((error) => {
        // An error happened.
    });
}


LogoutBtn.addEventListener('click',LogoutBtnHanlder)