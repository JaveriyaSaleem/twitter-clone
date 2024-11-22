import { getAuth, onAuthStateChanged,updateProfile,doc, updateDoc,db,signOut } from "../firebase.js";
let emailGet = document.getElementById('getEmail')
let nameUpdate = document.getElementById("Name")
let nameUpdate2 = document.getElementById("Name2")
let professionUpdate = document.getElementById("profession")
let professionUpdate2 = document.getElementById("profession2")
let phone = document.getElementById('phoneNumber')
let signOutBtn = document.getElementById('signOutBtn')
const auth = getAuth();
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
// user exists or not 
let uid;
onAuthStateChanged(auth, async(user) => {
  if (user) {
    uid = user.uid;
    console.log(user)
// if block complete here 
  } else {
console.log("signed out!")
  }
});
console.log("user",uid)
// console.log(auth.user)
let editBtn = document.getElementById('editBtn')
// edit button 
editBtn.addEventListener('click',(()=>{
let name = prompt("Name",nameUpdate.innerHTML)
let profession = prompt("Profession",professionUpdate.innerHTML)
let phoneNumber = prompt("Add your Number")
let address = prompt('Address')


}))




