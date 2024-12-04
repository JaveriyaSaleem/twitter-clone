import { getAuth, onAuthStateChanged,updateProfile,doc, updateDoc,db,signOut,serverTimestamp,getDoc } from "../firebase.js";
// cloudinary 
let cloudName = "dmpwebopc"
let unsignedUploadPreset = "ugiqcl22"
let emailGet = document.getElementById('getEmail')
let nameUpdate = document.getElementById("Name")
let nameUpdate2 = document.getElementById("Name2")
let professionUpdate = document.getElementById("profession")
let professionUpdate2 = document.getElementById("profession2")
let phone = document.getElementById('phoneNumber')
let addressUpdate = document.getElementById('address')
let signOutBtn = document.getElementById('signOutBtn')
let getPFP = document.getElementById('pfImage')
let getFormBtn = document.getElementById('formBtn')
let getModal = document.getElementById('modalBody')
let modalFullName = document.getElementById('modalFullName')
let modalProfession = document.getElementById('modalProfession')
let modalPhoneNumber = document.getElementById('modalPhoneNum')
let modalAddress = document.getElementById('modalAddress')
let modalInput = document.getElementById('modalPfpInput')
let doneBtnModal = document.getElementById('doneBtn')
let homeBtnSpiner = document.getElementById('homeBtnSpiner')
let editBtn = document.getElementById('editBtn')
let homeBtn = document.getElementById('homeBtn')
const auth = getAuth();
let emailUser;
let displayNameUser;
let createUrl;
let uid = null;
let getData;
let resourceUrl;
// redirecting to home 
homeBtn.addEventListener('click',(()=>{
  homeBtnSpiner.classList.remove('hidden')
  setTimeout(()=>{
    location.href = "../Dashboard/dashboard.html"
  },2000)
  
}))
// get the properties of currently signin user 
function fetchDataFromUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      displayNameUser = user.displayName;
      emailUser = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      console.log("User Info:", {
        displayName: displayNameUser,
        email: emailUser,
        photoURL,
        emailVerified,
        uid,
      });
      return emailUser,displayNameUser
    } else {
      console.log("No user is signed in.");
    }
    
  });
}
fetchDataFromUser();
// user exists or not 

function uidGeneration(){
  return new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async(user) => {
  if (user) {
    uid = user.uid;
    console.log(uid)
    resolve(uid)
// if block complete here 
  } else {
console.log("signed out!")
location.href = "../index.html"
  }
});
  })
}
modalInput.addEventListener('change',(()=>{
  console.log(modalInput.files[0])
  const getImage = modalInput.files[0]
  let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  let fd = new FormData() //empty data
  fd.append("file",getImage)
        fd.append("upload_preset",unsignedUploadPreset)
        fetch((url),{
          method:"POST",
          body:fd,
      }).then((response)=>response.json())
      .then((data)=>{
          console.log(data)
          resourceUrl = data.secure_url
          console.log(resourceUrl)
        })
}))
// donebtn of modal 
doneBtnModal.addEventListener("click",(async()=>{

// update data 
try{
  const updatingData = doc(db, "userData", await uidGeneration());
updateDoc(updatingData, {
  FullName: modalFullName.value,
  Profession: modalProfession.value,
  PhoneNumber: modalPhoneNumber.value,
  Address: modalAddress.value,
  timestamp: serverTimestamp(),
  Email: emailUser,
  ImageUrl: resourceUrl
  
});
Swal.fire({
  icon: "success",
  text: "Data Updated Successfully!",
});
const getData = await getDoc(updatingData);

if (getData.exists()) {
console.log("Document data:", getData.data());
const data = getData.data()
nameUpdate2.innerHTML = data.FullName
nameUpdate.innerHTML = data.FullName
professionUpdate.innerHTML = data.Profession
professionUpdate2.innerHTML = data.Profession
phone.innerHTML = data.PhoneNumber
addressUpdate.innerHTML = data.Address
emailGet.innerHTML = data.Email
getPFP.src = data.ImageUrl

} else {
console.log("No such document!");
}
setTimeout(()=>{
  getModal.classList.add('hidden')
},2000)
}catch(e){
console.log(e)
}

}))


getFormBtn.addEventListener('click',(()=>{
  // getModal.classList.add('')
  getModal.classList.remove('hidden')
  modalFullName.value = nameUpdate.innerHTML
  modalProfession.value = professionUpdate.innerHTML
  modalPhoneNumber.value = phone.innerHTML
  modalAddress.value = addressUpdate.innerHTML


}))

// fetching data when reload 
async function fetchDataa(){
const datafromFirestore = doc(db, "userData", await uidGeneration());
const getData = await getDoc(datafromFirestore);

if (getData.exists()) {
  console.log("Document data:", getData.data());
  const data = getData.data()
  nameUpdate2.innerHTML = data.FullName
  nameUpdate.innerHTML = data.FullName
  professionUpdate.innerHTML = data.Profession
  professionUpdate2.innerHTML = data.Profession
  phone.innerHTML = data.PhoneNumber
  addressUpdate.innerHTML = data.Address
  emailGet.innerHTML = data.Email
  getPFP.src = data.ImageUrl

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}

window.addEventListener("load", fetchDataa());


// signout 
signOutBtn.addEventListener('click',()=>{
  signOut(auth).then(() => {
    console.log(auth)
    Swal.fire({
      icon: "success",
      text: "Signed Out Successfully!",
    });
    setTimeout(()=>{
      location.href = "../Signin/signin.html"
    },3000)
  }).catch((error) => {
    console.log("didn't workk")
  });
})

