import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,updateProfile,
    // firestore 
    db,collection, addDoc,doc,setDoc
 } from "./firebase.js";
const auth = getAuth();
const provider = new GoogleAuthProvider();
let registerBtn = document.getElementById('register')
let getEmail = document.getElementById('email')
let getPassword = document.getElementById('password')
let getName = document.getElementById('fullName')
let googleBtn = document.getElementById('google')
let guestBtn = document.getElementById('guestBtn')
// guest Btn 
guestBtn && guestBtn.addEventListener('click',()=>{
    console.log("running the request")
    setTimeout(()=>{
        location.href = "./Dashboard/dashboard.html"
        },2000)
})
// click on register btn 
registerBtn && registerBtn.addEventListener('click',() => {
const email = getEmail.value.trim();
const password = getPassword.value.trim();
const fullName = getName.value.trim();
if(!email||!password||!fullName){
    Swal.fire("Please fill out all the fields")
    return
}    
createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            const uId = user.uid
            try {
                await setDoc(doc(db, "userData", uId), {
                    FullName: fullName,
                    Email: email,
                  });
                console.log(auth.currentUser)
                const saveUser = auth.currentUser
                updateProfile(await auth.currentUser, {
                    displayName: fullName
                  }).then(async() => {
                    console.log("displayName Updated",await auth.currentUser.displayName)
                  }).catch((error) => {
                    console.log(error)
                  });
                console.log("Document written with ID");
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });
              } catch (e) {
                console.error("Error adding document");
              }
            setTimeout(()=>{
            location.href = "./PFS/pfs.html"
            },3000)


        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            switch (errorCode) {
                case "auth/invalid-email":
                    Swal.fire("Add/Invalid Email");
                    break;
                case "auth/weak-password":
                    Swal.fire("Password Should be atleast 6 Characters");
                    break;
                case "auth/missing-password":
                    Swal.fire("Password is Missing");
                    break;
                case "auth/email-already-in-use":
                    Swal.fire("Account Already Exists");
                    break;

                default:
                    console.log('huh')
            }
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });

    getEmail.value = ""
    getPassword.value = ""
    getName.value = ""

})
// redirect to login btn 
let loginBtn = document.getElementById('login')
loginBtn.addEventListener('click',()=>{

    setTimeout(()=>{
        location.href = "./Signin/signin.html"
    },2000)
})
// google pop up 
googleBtn.addEventListener('click',(async()=>{
    signInWithPopup(auth, provider)
  .then(async(result) => {    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;   
    const user = result.user;
    let getId= user.uid
    console.log(getId)
    console.log(credential)
    await setDoc(doc(db, "userData", getId), {
        FullName: getName.innerHTML,
        Email: getEmail.innerHTML,
      });
      console.log("Document written with ID",getEmail.innerHTML);
        const Toast = await Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Signed in successfully"
        });
        setTimeout(()=>{
            location.href=  "./PFS/pfs.html"
        },4000)


  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

  });

}))


