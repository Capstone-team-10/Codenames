import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import "../css/Title.css";

const Title = (props) =>{
  const { isLoggedIn } = props;
  return (
    <div className="title-container">
       {isLoggedIn ? (null) : (<Link to="/auth/register">
      <button className="title-button">
        Want to be a spy!?
      </button>
      </Link>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !state.firebase.auth.isEmpty
  };
};

export default connect(mapStateToProps)(Title);
