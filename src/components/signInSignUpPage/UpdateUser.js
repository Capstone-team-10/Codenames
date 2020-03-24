// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import { compose } from 'redux'
// import {updateProfile} from "../../store/user"


// const UpdateUser = (props) => {

//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")

//   useEffect(() => {
//     setName(props.SignInUser.displayName)
//     setEmail(props.SignInUser.email)
//   }, [props.SignInUser])

//   const submitHandler = (evt) =>{
//     evt.preventDefault();
//     props.updateProfile(props.SignInUser.uid,name,email)
//     setEmail("")
//     setName("")
//   }

//   const onChangeHandler = (evt) =>{
//     if (evt.target.name === "Email") {
//       setEmail(evt.target.value);
//     } else {
//       setName(evt.target.value);
//     }
//   }

//     return (
//       <div className="User">
//       <div className="User-container">
//         <h1>Edit Profile</h1>
//         <form id="update" onSubmit={submitHandler}>
//         <div className="input-field">
//           <label htmlFor="name">Name</label>
//           <input name="name" onChange={onChangeHandler} value={name}/>
//         </div>
//         <div className="input-field">
//           <label htmlFor="Email">Email</label>
//           <input type="email" name="Email" onChange={onChangeHandler} value={email}/>
//         </div>
//         <button type="submit" className="btn center">
//           submit
//         {/* <Link to="/userProfile">
//           submit
//           </Link> */}
//         </button>
//       </form>
//       </div>
//       </div>
//     )
// }

// const mapStateToProps = (state) => {
//   return {
//     SignInUser: state.firebase.auth
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateProfile: (id,name,email) => dispatch(updateProfile(id,name,email))
//   }
// }

// export default compose(
//   firestoreConnect([
//     { collection: "Users"
//    }
//   ]),
//   connect(mapStateToProps,mapDispatchToProps)
// )(UpdateUser)
