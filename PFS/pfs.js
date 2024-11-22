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
// console.log(auth.user)
let editBtn = document.getElementById('editBtn')
// edit button 
editBtn.addEventListener('click',(()=>{
let name = prompt("Name",nameUpdate.innerHTML)
let profession = prompt("Profession",professionUpdate.innerHTML)
let phoneNumber = prompt("Add your Number")
let address = prompt('Address')
onAuthStateChanged(auth, async(user) => {
  if (user) {
    const uid = user.uid;
    console.log(user)
    console.log("user signed in")
    // update data 
    const updatingData = doc(db, "userData", user);

    // Set the "capital" field of the city 'DC'
    await updateDoc(updatingData, {
      updateName: name,
      updateProfession: profession,
      updatePhoneNumber: phoneNumber,
      updateAddress: address,
    });
// if block complete here 
  } else {
console.log("signed out!")
  }
});

}))




