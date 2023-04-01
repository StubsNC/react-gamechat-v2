import React, { useState } from "react";
import Add from "../../assets/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./styles.scss";
// import Login from "./Login";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const formData = new FormData(e.target);
  
    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("file");

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              createdAt: serverTimestamp(),
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/Room");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GameChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" name="displayName" placeholder="display name" />
          <input required type="email" name="email" placeholder="email" />
          <input required type="password" minLength="6" name="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" name="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="document icon" />
            <span>Add a Profile Picture</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
