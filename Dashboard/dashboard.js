import { signOut,orderBy,getAuth, onAuthStateChanged,db,getDoc,doc,query, where, setDoc,arrayUnion,updateDoc,collection,getDocs, serverTimestamp, addDoc } from "../firebase.js";
let makingPost = document.getElementById('textArea')
let postBtn = document.getElementById('postNow')
let allPost = document.getElementById('divOfAllPost')
let dashboardPfp = document.getElementById('dashboardPfp')
let profileBtn = document.getElementById('profile')
let leftPfp = document.getElementById('leftPfp')
let changingNameFromDisplayName = document.getElementById('changingNameFromDisplayName')
let makingHandleFromDisplayName = document.getElementById('makingHandleFromDisplayName')
let existedTweet = document.getElementById('existedTweet')
let loaderForPost = document.getElementById('loaderForPost')
let uid;
let handelCreated;
let dataObject = new Object()
let writePost = document.getElementById('writePost')
writePost.addEventListener('click',(()=>{
    location.href = "../PFS/pfs.html"
}))


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
       loaderForPost.classList.add('hidden')
    }, 2000);

});
profileBtn.addEventListener('click',(()=>{
setTimeout(()=>{
    location.href="../PFS/pfs.html"
},2000)
}))
document.getElementById('editPfp').addEventListener('click',(()=>{
    document.getElementById('homeBtnSpiner').classList.remove('hidden')
    setTimeout(()=>{
    location.href="../PFS/pfs.html"
},2000)
}))
document.getElementById('logOutBtn').addEventListener('click',(()=>{
    document.getElementById('homeBtnSpiner2').classList.remove('hidden')
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

}))
// if user is signin 
const auth = getAuth();
onAuthStateChanged(auth, async(user) => {
  if (await user) {
    uid = user.uid;
    // console.log(uid)
    // console.log("user signed in")
}

   else {
// console.log("signed out!")
setTimeout(()=>{
location.href = "../Signin/signin.html"
},2000)
  }
});

// getting uid 
async function fetchDataa(){
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              uid = user.uid;
            //   console.log(uid)
            //   console.log("user signed in")
              resolve(uid)
            }
            else{
                reject("nhi chala")
            }
          })    
    })  
}
// get data for showing in web 
async function gettingData() {
    try{

        const callingData = doc(db, "userData", await fetchDataa());
        const docSnap = await getDoc(callingData);
        
        if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
          let callData = docSnap.data()
          leftPfp.src = callData.ImageUrl
          dashboardPfp.src =  callData.ImageUrl
          dataObject.FullName = callData.FullName
          dataObject.Image = callData.ImageUrl
        //  console.log(dataObject,"data Object")
          let makingHandle = callData.FullName
          let newOne = makingHandle.toLowerCase()
          let result = newOne.split(" ")
          handelCreated = result.join("")
        //  console.log(handelCreated)
         changingNameFromDisplayName.innerHTML = callData.FullName
         makingHandleFromDisplayName.innerHTML = "@"+handelCreated
         existedTweet.src = callData.ImageUrl

        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
    }
    catch(e){
        console.log(e)
    }

}
gettingData()
// posting
postBtn.addEventListener('click',()=>{
    homeBtnSpiner3.classList.remove('hidden')
    setTimeout(async()=>{
        const postData = {
            UID: await fetchDataa(),
            PostContent: makingPost.value,
            ImageUrl: dataObject.Image,
            FullName: dataObject.FullName,
            Handle: handelCreated,
            Timestamp: serverTimestamp(),
        };

        // Adding the post to Firestore
        await addDoc(collection(db, "Posts"), postData);
        let createElement = document.createElement('section')
        createElement.setAttribute('id','post')
        createElement.setAttribute('class','grid grid-cols-10 gap-2  border-below py-2 px-2')
        allPost.prepend(createElement)
        let postDiv = document.getElementById('post')
        let time = new Date()
      //   adding post 
       postDiv.innerHTML  = `<!-- pfp  -->
                      <figure class="flex justify-end items-start h-100"><img src="${await dataObject.Image}" class="w-10 rounded-full"
                              alt="..."></figure>
                      <!-- post div  -->
                      <div class="col-span-9 ... pe-2">
                          <!-- handle name pfp  -->
                          <div class="flex justify-between">
                              <div class="flex gap-1">
                                  <span class="text-[15px] font-bold">${await dataObject.FullName}</span> <span
                                      class="text-[15px] text-[#71767B]">@${handelCreated}</span>
                                  <span class="text-[15px] text-[#71767B]"> . ${time.toLocaleTimeString()}</span>
                              </div>
                              <a href=""
                                  class="text-[15px] py-1 px-2 rounded-full text-[#71767B] hover:text-[#1D9BF0] hover:bg-[#0A171F]"><i
                                      class="fa-solid fa-ellipsis bg-"></i></a>
                          </div>
                          <!-- post content  -->
                          <div class="pb-3">
                              <p>${makingPost.value}</p>
                          </div>
                          <!-- icons of comment likes  -->
                          <div class="flex justify-between">
                              <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#1D9BF0]"><i
                                      class="text-[15px] fa-regular fa-comment fa-flip-horizontal font-thin"></i><span
                                      class="text-xs">20</span></a>
      
                              <!-- retweet  -->
                              <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#00BA7C]">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                      class="w-3.5 stroke-[#71767B] hover:stroke-[#00BA7C] bi bi-arrow-down-up"
                                      viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                                  </svg><span class="text-xs">5</span> </a>
                              <!-- heart  -->
                              <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#F91880]">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                      class="w-3.5 stroke-[#71767B] hover:stroke-[#F91880] fill-black bi bi-heart-fill"
                                      viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                  </svg> <span class="text-xs">290</span> </a>
                              <!-- views  -->
                              <a href="" class="flex items-center text-[#71767B] hover:text-[#1D9BF0]">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                      class="w-3.5 rounded-full stroke-[#71767B] hover:stroke-[#1D9BF0]  rotate-[270deg] bi bi-text-left"
                                      viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                  </svg><span class="text-xs">1k</span></a>
                              <div class="flex gap-3 items-center pe-3">
                                  <!-- bookmark  -->
                                  <a href="" class="text-[#71767B] hover:text-[#1D9BF0]">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                          class="w-3.5 fill-[#71767B] hover:fill-[#1D9BF0] bi bi-bookmark"
                                          viewBox="0 0 16 16">
                                          <path
                                              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                      </svg> </a>
                                  <!-- share  -->
                                  <a href="" class="text-[#71767B] hover:text-[#1D9BF0]">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                          class="w-3.5 fill-[#71767B] hover:fill-[#1D9BF0] bi bi-upload" viewBox="0 0 16 16">
                                          <path
                                              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                          <path
                                              d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                      </svg> </a>
                              </div>
                          </div>
                      </div>`                    
        makingPost.value = "" 
        homeBtnSpiner3.classList.add('hidden') 
    },3000)
    
  })
// fetching posts when reload 
async function fetchWhenReload(){
    try {
        allPost.innerHTML = "";
        const q = query(
            collection(db, "Posts"),
            orderBy("Timestamp", "asc") // Ensure your field is named 'timestamp' in Firestore
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let makeTime = doc.data().Timestamp.toDate()
          let date = new Date(makeTime)
          let time = moment(date).format("MM-DD")
          console.log(time)

          let createElement = document.createElement('section')
          createElement.setAttribute('id','post')
          createElement.setAttribute('class','grid grid-cols-12 sm:grid-cols-10 gap-2  border-below py-2 px-2')
          allPost.prepend(createElement)
          let postDiv = document.getElementById('post')
        //   adding post 
         postDiv.innerHTML  += `<!-- pfp  -->
                        <figure class="col-span-2 sm:col-span-1 flex justify-end items-start h-100"><img src="${doc.data().ImageUrl}" class="w-100 rounded-full"
                                alt="..."></figure>
                        <!-- post div  -->
                        <div class="col-span-10 sm:col-span-9 ... pe-2">
                            <!-- handle name pfp  -->
                            <div class="flex justify-between">
                                <div class="flex gap-1">
                                    <span class="text-[15px] font-bold">${doc.data().FullName}</span> <span
                                        class="text-[15px] text-[#71767B]">@${doc.data().Handle}</span>
                                    <span class="text-[15px] text-[#71767B]"> . ${time}</span>
                                </div>
                                <a href=""
                                    class="text-[15px] py-1 px-2 rounded-full text-[#71767B] hover:text-[#1D9BF0] hover:bg-[#0A171F]"><i
                                        class="fa-solid fa-ellipsis bg-"></i></a>
                            </div>
                            <!-- post content  -->
                            <div class="pb-3">
                                <p>${doc.data().PostContent}</p>
                            </div>
                            <!-- icons of comment likes  -->
                            <div class="flex justify-between">
                                <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#1D9BF0]"><i
                                        class="text-[15px] fa-regular fa-comment fa-flip-horizontal font-thin"></i><span
                                        class="text-xs">20</span></a>
        
                                <!-- retweet  -->
                                <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#00BA7C]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="w-3.5 stroke-[#71767B] hover:stroke-[#00BA7C] bi bi-arrow-down-up"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                                    </svg><span class="text-xs">5</span> </a>
                                <!-- heart  -->
                                <a href="" class="flex items-center gap-1 text-[#71767B] hover:text-[#F91880]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="w-3.5 stroke-[#71767B] hover:stroke-[#F91880] fill-black bi bi-heart-fill"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg> <span class="text-xs">290</span> </a>
                                <!-- views  -->
                                <a href="" class="flex items-center text-[#71767B] hover:text-[#1D9BF0]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="w-3.5 rounded-full stroke-[#71767B] hover:stroke-[#1D9BF0]  rotate-[270deg] bi bi-text-left"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                    </svg><span class="text-xs">1k</span></a>
                                <div class="flex gap-3 items-center pe-3">
                                    <!-- bookmark  -->
                                    <a href="" class="text-[#71767B] hover:text-[#1D9BF0]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                            class="w-3.5 fill-[#71767B] hover:fill-[#1D9BF0] bi bi-bookmark"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                        </svg> </a>
                                    <!-- share  -->
                                    <a href="" class="text-[#71767B] hover:text-[#1D9BF0]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                            class="w-3.5 fill-[#71767B] hover:fill-[#1D9BF0] bi bi-upload" viewBox="0 0 16 16">
                                            <path
                                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path
                                                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                        </svg> </a>
                                </div>
                            </div>
                        </div>`  

        });


    } catch (error) {
        console.log(error)
    }



    console.log("hello!")
  }
  window.addEventListener('load',fetchWhenReload)




