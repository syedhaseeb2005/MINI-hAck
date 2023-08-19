import {query,collection,db,auth,doc,getDoc,getDocs} from './firebaseconfig.js'

const postupload = document.querySelector('.postupload')
// console.log(postupload);
const PostDescription = document.getElementById('PostDescription')
// console.log(PostDescription);
async function getpost(){

    // PostDescription.innerHTML = ' '
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (doc) => {
        
        const { authorId, PostTitle,PostContent ,timestamp} = doc.data()
        
        const authorDetails = await getAuthorData(authorId)
        let postId = doc.id
        let PosTelement = document.createElement('div')
        PosTelement.setAttribute('class', 'mypost')
        
        PosTelement.innerHTML = `
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
                            postupload.appendChild(PosTelement)
            //   PosTelement.appendChild(content)
            //   PostDescription.appendChild(PosTelement)
              // alert('your post has been added')           
            })
        }


        getpost()

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
        
        