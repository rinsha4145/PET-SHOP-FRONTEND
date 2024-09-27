
// import  { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';

// function UsecustomLogin() {
//     const [datas,setdatas] = useState({
//         email: '',
//         password: ''
//       });
//       const storedcurrent=localStorage.getItem("current")
//       console.log("from localstorage",storedcurrent);
      
//       const[current,setcurrent]=useState(storedcurrent? JSON.parse(storedcurrent):null)
//       const navigate=useNavigate()

//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setdatas({ ...datas, [name]: value });
//       };
    
//       const handleSubmit = async(e) => {
//         e.preventDefault();
//         try {
//           const response=await axios.get("http://localhost:3000/Users")
//         const users=response.data
//         const user=users.find(user=>user.email===datas.email&&user.password===datas.password)
//         if(user){
//           localStorage.setItem("current",JSON.stringify(user))
//           setcurrent(user)
//           alert('Login successfully completed')
//           setdatas({email:'',password:''}) //to clear the data after login
//           navigate('/')
//         }else{
//           alert('incorrect email and password')
//         }
//         } catch (error) {
//           console.log("error occured")
          
//         }
        
//       };
     
//       const handlelogout = () => {
//         setcurrent(null);
//         localStorage.removeItem('cartData');

//          navigate('/profile')
//     };

    
//   return {handleChange,handleSubmit,handlelogout,datas,current}
// }

// export default UsecustomLogin
 

// // import { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // function UsecustomLogin() {
// //     const [datas, setdatas] = useState({
// //         email: '',
// //         password: ''
// //     });
    
// //     const [current, setcurrent] = useState(null);
// //     const navigate = useNavigate();

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setdatas({ ...datas, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //       e.preventDefault();
// //       try {
// //         const response = await axios.get("http://localhost:3000/Users");
// //         const users = response.data;
// //         const user = users.find(user => user.email === datas.email && user.password === datas.password);
// //         if (user) {
// //           localStorage.setItem("current", JSON.stringify(user));
// //           setcurrent(user);
// //           alert('Login successfully completed');
// //           setdatas({ email: '', password: '' }); // Clear the data after login
// //           navigate('/');
// //         } else {
// //           alert('Incorrect email and password');
// //         }
// //       } catch (error) {
// //         console.error('Error occurred during login:', error.response ? error.response.data : error.message);
// //       }
// //     };
    

// //     const handleLogout = () => {
// //         // Perform logout logic
// //         setcurrent(null);
// //         navigate('/profile');
// //     };

// //     return { handleChange, handleSubmit, handleLogout, datas, current };
// // }

// // export default UsecustomLogin;

