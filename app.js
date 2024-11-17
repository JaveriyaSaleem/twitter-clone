import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";
const auth = getAuth();
let registerBtn = document.getElementById('register')
let getEmail = document.getElementById('email')
let getPassword = document.getElementById('password')
let getName = document.getElementById('fullName')
// click on register btn 
registerBtn && registerBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, getEmail.value, getPassword.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
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
location.href = "./Dashboard/dashboard.html"
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

let loginBtn = document.getElementById('login')
loginBtn.addEventListener('click',()=>{

    setTimeout(()=>{
        location.href = "./Signin/signin.html"
    },2000)
})