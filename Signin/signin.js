import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,db,collection, addDoc,doc,setDoc } from "../firebase.js";
const auth = getAuth();
const provider = new GoogleAuthProvider();
let signUp = document.getElementById('signUp')
let getEmail = document.getElementById('email')
let getPassword = document.getElementById('password')
let loginBtn = document.getElementById('login')
let forgetPass = document.getElementById('forgetPassword')
let googleBtn = document.getElementById('google')
// loginBtn 
loginBtn.addEventListener('click',(()=>{
    signInWithEmailAndPassword(auth, getEmail.value, getPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    Swal.fire({
        icon: "success",
        text: "Login Successfully",
      });
      setTimeout(()=>{
        location.href = "../Dashboard/dashboard.html"
      },3000)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    switch(errorCode){
        case "auth/invalid-email":
        Swal.fire("Add/Invalid Email");
        break;
        case "auth/invalid-credential":
            Swal.fire("Invalid Credential");
            break;
    }
  });
}))
// forgetPassword 
forgetPass.addEventListener('click',(async()=>{
    const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address"
      });
      if (email) {
        Swal.fire(`Entered email: ${email}`);
      }
    sendPasswordResetEmail(auth, email)
      .then(() => {
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
            title: "Email has been sent!"
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        switch(errorCode){
            case "auth/missing-email":
            Swal.fire("Missing Email");
            break;
        }
        
      });
}))
// sign up button 
signUp.addEventListener('click',(()=>{
    setTimeout(()=>{
        location.href = "../index.html"
    },4000)
}))
// google pop up 
googleBtn.addEventListener('click',(()=>{
  signInWithPopup(auth, provider)
.then(async(result) => {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  console.log(credential)
  const userId = result.user;
  console.log(userId)
    let getId= userId.uid
    console.log(getId)
    await setDoc(doc(db, "userData", await getId), {
      FullName: user.displayName,
      Email: user.email,
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
      location.href= "../Dashboard/dashboard.html"
  },1000)
}).catch((error) => {
  const errorCode = error.code;
  console.log(errorCode)
  const errorMessage = error.message;
  const email = error.customData.email;
  const credential = GoogleAuthProvider.credentialFromError(error);
});
}))


