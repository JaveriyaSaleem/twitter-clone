import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,
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
                    country: "USA"
                  });
                console.log("Document written with ID");
                const Toast = Swal.mixin({
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
              } catch (e) {
                console.error("Error adding document");
              }



            setTimeout(()=>{
            location.href = "./Dashboard/dashboard.html"
            },4000)


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
    try{
        let result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(credential)
        setDoc(doc(db, "userData", user), {
            FullName: fullName,
            Email: email,
          });
          console.log("Document written with ID");
        const Toast = Swal.mixin({
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
        location.href= "../Dashboard/dashboard.html"
    },3000)

    }
    catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}))

