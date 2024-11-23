import { getAuth, onAuthStateChanged,updateProfile,doc, updateDoc,db,signOut,serverTimestamp,getDoc } from "../firebase.js";
let emailGet = document.getElementById('getEmail')
let nameUpdate = document.getElementById("Name")
let nameUpdate2 = document.getElementById("Name2")
let professionUpdate = document.getElementById("profession")
let professionUpdate2 = document.getElementById("profession2")
let phone = document.getElementById('phoneNumber')
let addressUpdate = document.getElementById('address')
let signOutBtn = document.getElementById('signOutBtn')
let getInput = document.getElementById('Input')
let getPFP = document.getElementById('pfImage')
let createUrl;
getInput.addEventListener('change',(()=>{
  console.log(getInput.files[0])
  let file = getInput.files[0]
  createUrl = URL.createObjectURL(file)
  console.log(createUrl)
  getPFP.src = createUrl

}))

const auth = getAuth();
let emailUser;
let displayNameUser;
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
let uid = null
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



// console.log(auth.user)
let editBtn = document.getElementById('editBtn')
// gettingdata
let getData;
// edit button 
editBtn.addEventListener('click',(async()=>{
let name = prompt("Name",nameUpdate.innerHTML)
let profession = prompt("Profession",professionUpdate.innerHTML)
let phoneNumber = prompt("Add your Number")
let address = prompt('Address')
    // update data 
    const updatingData = doc(db, "userData", await uidGeneration());
    updateDoc(updatingData, {
      FullName: name,
      Profession: profession,
      PhoneNumber: phoneNumber,
      Address: address,
      timestamp: serverTimestamp(),
      Email: emailUser,
      Image: createUrl
      
    });
    console.log(await uidGeneration())
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
    getPFP.src = createUrl


 

    } else {
    console.log("No such document!");
}
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
  getPFP.src = data.Image

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

