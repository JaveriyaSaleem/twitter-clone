import { getAuth, onAuthStateChanged,updateProfile } from "../firebase.js";
let emailGet = document.getElementById('getEmail')
let nameUpdate = document.getElementById("Name")
let nameUpdate2 = document.getElementById("Name2")
let professionUpdate = document.getElementById("profession")
let professionUpdate2 = document.getElementById("profession2")
let phone = document.getElementById('phoneNumber')
let name;
let profession;
const auth = getAuth();
let editBtn = document.getElementById('editBtn')
editBtn.addEventListener('click',(()=>{
name = prompt("Name",nameUpdate.innerHTML)
profession = prompt("Profession",professionUpdate.innerHTML)
let phoneNum = prompt("Phone Number",phone.innerHTML)
  updateProfile(auth.currentUser, {
    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg",phoneNumber: phoneNum,
  }).then(() => {
    alert("profile updated!")
    nameUpdate.innerHTML = name
    nameUpdate2.innerHTML = name
    professionUpdate.innerHTML = profession
    professionUpdate2.innerHTML = profession
    phone.innerHTML = phoneNum


  }).catch((error) => {
    // An error occurred
    // ...
  });
}))




// if user is sign in 
onAuthStateChanged(auth, (user) => {
  if (user) {
   console.log(user)
    const uid = user.uid;
    emailGet.innerHTML = user.email
  } else {
    console.log("user is signed out")
  }
});