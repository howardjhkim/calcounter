import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"
import { useNavigate } from "react-router-dom";
import {Context} from "../Context/DataContext"



export default function Login( {setIsAuth} ) {

  const { isAuth } = useContext(Context)
  const { addIsAuth } = useContext(Context)

  let navigate = useNavigate()
  
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    // Save users data to local storage whenever it changes
    localStorage.setItem("usersData", JSON.stringify(users));
  }, [users]);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    await getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const profilePic = res.user.photoURL

        localStorage.setItem("isAuth", true)
        addIsAuth(true)

        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("profilePic", profilePic)
        navigate("/")
    })
    .catch((err) =>{
        console.log(err)
    })
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <div>
        <input placeholder="Name" onChange={(e) => { setNewName(e.target.value) }} />
        <input type="number" placeholder="Age" onChange={(e) => { setNewAge(e.target.value) }} />
        <button onClick={createUser}>Create User</button>
      </div>

      <div className="test">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <button onClick={() => { updateUser(user.id, user.age) }}>Update Age</button>
              <button onClick={() => { deleteUser(user.id) }}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
