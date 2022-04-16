import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./chat.css";

function Chatpage(props) {
  const [newtitle, setTitle] = useState();
 // const [titles, setTitles] = useState([]);
  const titles = [];
  useEffect(()=>{
    axios
  .get("http://localhost:5000/Chatpage")
  .then((response) => {
    console.log(response.data);
     response.data.forEach(element => {
       titles.push(element)
     });
     console.log("successfully retrieved "+titles);
  })
  .catch((error) => {
    console.log("error in retrieving the data");
    console.log(error);
  });
  },[])
  

  const addChannel = async (event) => {
    event.preventDefault();
    // setTitles((prev) => {
    //   return [...titles, newtitle];
    // });
    // console.log(titles);
    const newRoom = {
      title: newtitle,
    };
    let headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post("http://localhost:5000/Chatpage", newRoom, headers)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("chatpage error");
        console.log(error);
      });
     
  };

  return props.isAuthenticated ? (
    <>
      {/* <h1>Welcome {props.user.name}</h1> */}
      <div className="container">
        <div className="row layout">
          <div className="col-3 text-light chatrooms bg-dark border border-dark">
            <div className="createchannel mt-3  d-flex">
              <div className="p-2">
                <h5>Create channel</h5>
              </div>
              <div className="p-1 addbutton">
                <button
                  className=" btn btn-dark btn-sm border border-white"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="text-dark modal-title">Channel title</h5>

                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addChannel}
                    >
                      Add channel
                    </button>
                  </div>
                </div>
              </div>
            </div>
             
             {titles.map((list) => {
              return <div className="mt-3">
                <button className="roombtn btn btn-dark btn-md border border-white">
                  {list}
                </button>
              </div>;
            }) }
            {console.log("in html"+titles)}
             
           
            <div className="mt-3">
              <button className="roombtn btn btn-dark btn-md border border-white">
                Welcome
              </button>
            </div>
          </div>
          <div className="col-9 chats border border-dark "></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="d-flex flex-row">
        <h1>please </h1>
        <Link
          className="btn mt-2 btn-md text-primary"
          to="/Login"
          role="button"
        >
          Login
        </Link>
        <h1> to the space chat</h1>
      </div>
    </>
  );
}

export default Chatpage;
