import Slider from "../../components/Slider/Slider";
import "./Singlepage.scss";
import Map from "../../components/Map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ChatBox from "../../components/ChatBox/ChatBox";
import noAvatar from "../../../public/noavatar.jpg";

const Singlepage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const [showChatBox, setShowChatBox] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [chatData, setChatData] = useState(null);

  const navigate = useNavigate();

  console.log(post.user.id);
  const handleSendMessage = async () => {
    try {
      console.log("in the form");

      const res = await apiRequest().post("/chats", {
        receiverId: post.user.id,
      });

      console.log("chat created");

      setChatData(res.data);
      setNewChat(false);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }

    setNewChat((prev) => !prev);
    console.log(newChat);
    setShowChatBox((prev) => !prev);
  };
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest().post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.imges} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                 <img src={post.user.avatar || noAvatar} alt="" />

                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>

          {showChatBox ? ( // Render the ChatBox component if showChat is true
            <ChatBox
              currentUser={currentUser}
              receiver={post.user}
              chatData={chatData}
              newChat={newChat}
              setNewChat={setNewChat}
              setShowChatBox={setShowChatBox} // Close the chat box when the user closes it
            />
          ) : (
            <>
              <div className="mapContainer2">
                <Map items={[post]} />
              </div>
              <div className="buttons">
                <button onClick={handleSendMessage}>
                  <img src="/chat.png" alt="" />
                  Send a Message
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: saved ? "#fece51" : "white",
                  }}
                >
                  <img src="/save.png" alt="" />
                  {saved ? "Place Saved" : "Save the Place"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Singlepage;
