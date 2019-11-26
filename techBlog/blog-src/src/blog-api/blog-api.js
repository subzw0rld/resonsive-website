import axios from 'axios';

const blogData = () => axios.get('http://localhost:8000/techBlog').then(response =>  {
    return response.data.blogList;
});

/********* The Line below has been commented as I have switched to Express + Mongo for the Restful API **********/
// const ref = window.firebase.database().ref("blog-list");
// const query = ref;
// const blogData = () => query.once("value")
//     .then(function (snapshot) {
//         // console.log(snapshot.numChildren());
//         // snapshot.forEach(function (childSnapshot) {
//         //     var key = childSnapshot.key;
//         //     var childData = childSnapshot.val();
//         //     console.log(key, ":", childData);
//         // });
//         let output=[];
//         snapshot.forEach(childSnapshot => {
//             output.push(childSnapshot.val());
//         })

//         return output;
//     });


export default blogData;