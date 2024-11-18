import { getAuth, onAuthStateChanged,updateProfile,doc, updateDoc,db } from "../firebase.js";
let emailGet = document.getElementById('getEmail')
let nameUpdate = document.getElementById("Name")
let nameUpdate2 = document.getElementById("Name2")
let professionUpdate = document.getElementById("profession")
let professionUpdate2 = document.getElementById("profession2")
let phone = document.getElementById('phoneNumber')
const auth = getAuth();
let editBtn = document.getElementById('editBtn')
// edit button 
editBtn.addEventListener('click',(()=>{
let name = prompt("Name",nameUpdate.innerHTML)
let profession = prompt("Profession",professionUpdate.innerHTML)
let phoneNumber = prompt("Add your Number")
let address = prompt('Address')
// if user is sign in 
onAuthStateChanged(auth, async(user) =>{
  if (user) {
   console.log(user)
    const uid = user.uid;
    const myData = doc(db, "userData", uid);
    await updateDoc(myData, {
    FullName:name,
    Profession: profession,
    PhoneNumber: phoneNumber,
    Address:address
});
try{
  await updateProfile(auth.currentUser, {
    displayName: name
  })
  alert("Profile updated!");
  nameUpdate.innerHTML = name
  nameUpdate2.innerHTML = name
  professionUpdate.innerHTML = profession
  professionUpdate2.innerHTML = profession
  phone.innerHTML = phoneNum;

  }catch(e){

  } 
  
}else{
  console.log("user is signout")
}});

}))




