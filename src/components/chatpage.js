import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './chat.css'
import moment from 'moment'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add'
import FlareIcon from '@mui/icons-material/Flare'

function Chatpage(props) {
  const [newtitle, setTitle] = useState()
  const [titles, setTitles] = useState([])
  const [currentTitle, setCurrentTitle] = useState()
  const [isAnyRoomclicked, setIsAnyRoomclicked] = useState(false)
  const [message, setMessage] = useState()
  const [messageData, setMessageData] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageData])

  useEffect(() => {
    axios
      .get('http://localhost:5000/Chatpage')
      .then((response) => {
        setTitles(response.data)
      })
      .catch((error) => {
        console.log('error in retrieving the data')
        console.log(error)
      })
  }, [])

  const addChannel = async (event) => {
    event.preventDefault()
    const newRoom = {
      title: newtitle,
      userId: props.user.id,
    }
    let headers = {
      'Content-Type': 'application/json',
    }
    await axios
      .post('http://localhost:5000/Chatpage', newRoom, headers)
      .then((response) => {
        console.log(response)
        setTitles([...titles, newtitle])
      })
      .catch((error) => {
        console.log('chatpage error')
        console.log(error.response)
        if (error.response.data === 'title name is taken') {
          alert('Channel name is already taken!')
        }
      })
  }

  const wel = () => {
    setIsAnyRoomclicked(false)
  }

  const chatRoomhandle = async (e) => {
    console.log(e.target.value)
    setCurrentTitle(e.target.value)
    setIsAnyRoomclicked(true)
    try {
      const resp = await axios.patch('http://localhost:5000/Chatpage', {
        title: e.target.value,
        userId: props.user.id,
      })
      console.log(resp)
    } catch (err) {
      console.log('handled patch' + err)
    }
    console.log('our title' + e.target.value)
    const msgdata = await axios.get(
      'http://localhost:5000/Chatpage/' + e.target.value
    )
    console.log(msgdata.data)
    setMessageData(
      msgdata.data.map((msg) => ({
        msg: msg.msg,
        username: msg.username,
        createdAt: moment(msg.createdAt).format('MMM Do YYYY, h:mm a'),
      }))
    )
    console.log('huu ', messageData)
  }

  const sendMessage = async (msgProp) => {
    await axios
      .post('http://localhost:5000/Chatpage/x/gettitleid', {
        title: currentTitle,
      })
      .then((res) => {
        axios
          .get('http://localhost:5000/Chatpage/x/gettitleid')
          .then((resp) => {
            const message = {
              titleId: resp.data,
              userId: props.user.id,
              msg: msgProp,
            }
            axios
              .post('http://localhost:5000/Chatpage/x/messages', message)
              .then(async (res) => {
                const newmsg = await axios.get(
                  'http://localhost:5000/Chatpage/' + currentTitle
                )
                setMessageData([
                  ...newmsg.data.map((msg) => ({
                    msg: msg.msg,
                    username: msg.username,
                    createdAt: moment(msg.createdAt).format(
                      'MMM Do YYYY, h:mm a'
                    ),
                  })),
                ])
                setMessage('')
              })
              .catch((error) => {
                console.log(error)
              })
          })
      })
      .catch((err) => {
        console.log('gettitleiderror', err)
      })
  }
  return props.isAuthenticated ? (
    <div className="chatpage">
      <div className="cp">
        <div className="shadow-lg layout">
          <div className="col-3 chatrooms border border-dark">
            <div className="createchannel d-flex">
              <div className="p-2">
                <h5 className="">Channels</h5>
              </div>
              <div className="p-1 addbutton">
                <button
                  className=" btn btn-dark btn-sm "
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <AddIcon />
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
                          setTitle(e.target.value)
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
                      aria-label="Close"
                      data-dismiss="modal"
                      onClick={addChannel}
                    >
                      Add channel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="roomscolumn">
              {titles.map((list, index) => {
                return (
                  <div key={index} className="mt-3">
                    <button
                      className="roombtn btn text-light btn-lg"
                      value={list}
                      name={list}
                      onClick={chatRoomhandle}
                    >
                      {list}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-3">
              <button
                className="roombtn btn btn-dark btn-lg"
                onClick={wel}
                value="welcome"
              >
                Welcome
              </button>
            </div>
          </div>
          <div className="col-9 chats border border-dark">
            {isAnyRoomclicked ? (
              <div className="chatclick">
                <h3 className="titlename mt-2 p-2">{currentTitle}</h3>
                <div className="chatenv insidechatenv">
                  <div className="messages">
                    <div className="allmsgs">
                      {messageData.map((msgdiv, index) => {
                        return (
                          <div key={index}>
                            <div className="mb-2 msgcontent">
                              <div>
                                <div className="name">{msgdiv.username}</div>{' '}
                                <span className="dateandtime">
                                  {msgdiv.createdAt}{' '}
                                </span>
                              </div>

                              <div className="msg">{msgdiv.msg}</div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>{' '}
                {/*chatenv end*/}
                <div className="align-bottom input-group sendbox mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendMessage(message)
                        return
                      }
                    }}
                    onChange={(e) => {
                      // console.log(e.key);
                      setMessage(e.target.value)
                    }}
                    value={message}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      name="send"
                      onClick={() => sendMessage(message)}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
                {/*input message div closing*/}
              </div>
            ) : (
              <div>
                <h3 className="titlename mt-3 p-2">Welcome to Space Chat</h3>

                <h2 className="display-4 p-2">
                  space chat is the place where...
                </h2>
                <div className="p-2">
                  <h3 className="mb-3">
                    <FlareIcon /> you can discover millions of rooms, filled
                    with fascinating and unexpected conversations.
                  </h3>

                  <h3 className="mb-3">
                    <FlareIcon /> you can join the community with the people of
                    same thoughts.
                  </h3>
                  <h3 className="mb-3">
                    {' '}
                    <FlareIcon /> you can explore more in the topic you wanted.
                  </h3>
                  <h3 className="mb-3">
                    {' '}
                    <FlareIcon /> you can clear your doubts while you were
                    stuck.
                  </h3>
                  <h3 className="mb-3">
                    {' '}
                    <FlareIcon /> you can host a room of your choice
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
  )
}

export default Chatpage
