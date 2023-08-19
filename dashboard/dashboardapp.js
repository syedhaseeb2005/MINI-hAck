import {onAuthStateChanged,auth,doc,db,getDoc,signOut,addDoc,collection,getDocs,updateDoc,deleteDoc} from '../firebaseconfig.js'

const username = document.getElementById('username')
const LogoutBtn = document.getElementById('LogoutBtn')
const usernameinBlog = document.querySelector('.username')
// console.log(usernameinBlog);
const postTitle = document.getElementById('postTitle')
const postDate = document.getElementById('postDate')
const PostDescription = document.getElementById('PostDescription')
const deleteBtn = document.getElementById('deleteBtn')
const EditBtn = document.getElementById('EditBtn')

const Givetitle = document.getElementById('Givetitle')
const Givecontent = document.getElementById('Givecontent')
const Publish = document.getElementById('Publish')

let editFlag = false
// console.log(Givetitle);
// console.log(Givecontent);
// console.log(Publish);
// console.log(postTitle);
// console.log(postDate);
// console.log(PostDescription);
// console.log(deleteBtn);
// console.log(EditBtn);
const modal = document.querySelector('.modal')
const UpdateTitle = document.getElementById('UpdateTitle')
const UpdateDescription = document.getElementById('UpdateDescription')
const UpdateBtn = document.getElementById('UpdateBtn')

let postGlobal;
editFlag ? Publish.innerHTML = 'Update Blog ' : Publish.innerHTML = 'Publish Blog';
getpost()


let currentLoggedInUser;


onAuthStateChanged(auth,(user) => {
    if (user) {
        // LogoutBtn.style.display = 'none'
        const uid = user.uid;
        console.log(uid);
        getuserdata(uid)
        currentLoggedInUser = uid
    } else {
        window.location.href = "../index.html" 
    }
});


async function getuserdata(uid){
    try{
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const{SignupFirstname,SignupLastname} = docSnap.data()
            username.innerHTML = SignupFirstname + " " + SignupLastname
            usernameinBlog.innerHTML = SignupFirstname + " " + SignupLastname
            // console.log(docSnap.data())
        }else{
            console.log('kuch nahi mil rahah')
        }       
    }catch(error){
        console.log(error)
    }
}

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



Publish.addEventListener('click',PublishbtnHanlder)

async function PublishbtnHanlder(){
    // console.log(PublishbtnHanlder);
    try {
        const response = await addDoc(collection(db, "posts"), {
        PostTitle: Givetitle.value,
        PostContent: Givecontent.value,
        authorId: currentLoggedInUser,
    //    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
// console.log(response.id)
        getpost()
        Givetitle.value = ''
        Givecontent.value = ''
        if(Givetitle == ''  ||  Givecontent == ''){
            alert('plzz fill the field')
        }
     } catch (error) {
     console.error(error);
    }
}

async function getpost(){

    PostDescription.innerHTML = ' '
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
    
        const { authorId, PostTitle,PostContent ,timestamp} = doc.data()
        
        const authorDetails = await getAuthorData(authorId)
        let postId = doc.id
        const PosTelement = document.createElement('div')
        PosTelement.setAttribute('class', 'mypost')

        const content = `
        <span style="display: flex;flex-direction: row;">
             <img id="img" src="../assesst/c8dfc008-2a7f-4e3e-a653-1b6ef2d093ec-removebg-preview.png" alt="Post Image">
                 <span style="display: flex;flex-direction: column;">
                     <h2 id="postTitle">${PostTitle}</h2>
                     <p id="postDate"><span class="username">${authorDetails?.SignupFirstname}${authorDetails.SignupLastname}</span> - August 19, 2023</p>
                 </span>
         </span>
             <p id="PostDescription">${PostContent}</p>
             <button onclick= DeletePostHandler('${postId}')  id="deleteBtn">Delete</button>
              <button onclick= editPostHandler('${postId}') id="EditBtn">Edit</button>
              <br>
              <br>
        `
        PosTelement.innerHTML = content
        PostDescription.appendChild(PosTelement)
    // alert('your post has been added')           
})
}




async function getAuthorData(authorId){
    const docRef = doc(db, "users", authorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function DeletePostHandler(postId){
    // console.log(DeletePostHandler);
    await deleteDoc(doc(db, "posts", postId));
    alert("Your post deleted successfully")
    getpost()
}

async function editPostHandler(postId){
    // console.log(editPostHandler);
    editFlag = true
    Publish.innerText = 'Update Blog'
    Publish.removeEventListener('click', PublishbtnHanlder)
    Publish.addEventListener('click',updateHanlderFuction)
    postGlobal = postId
}
async function updateHanlderFuction(){
    try {
        const washingtonRef = doc(db, "posts", postGlobal);
        const response = await updateDoc(washingtonRef, {
            PostTitle: Givetitle.value,
            PostContent: Givecontent.value,
            authorId: currentLoggedInUser,
        });
        Givetitle.value = ''
        Givecontent.value = ''
        Publish.innerText = 'Publish Blog'
        getpost()
    } catch (e) {
        console.error("Error adding document: ", e);
    }



}




window.editPostHandler = editPostHandler
window.DeletePostHandler = DeletePostHandler