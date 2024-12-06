import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../componentes/ui/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {
  useCreateMessageMutation,
  useGetChatsByUserIdQuery,
  useGetMessagesByChatIdQuery,
  useGetUsersQuery,
} from "../app/apis/compartiendoSabores.api";
import { Message, User, Chat as iChat } from "../interfaces/index";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const socket = io("http://localhost:3000");

const Chat = () => {
  const isUserAuthenticated = localStorage.getItem("user");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);

  const [friendSelected, setFriendSelected] = useState<User>();
  const [chatSelected, setChatSelected] = useState<iChat>();

  const { data: myChats = [] } = useGetChatsByUserIdQuery(
    userCredentials.profile.email,
  );
  const { data: users = [] } = useGetUsersQuery();
  const { data: myMessages = [], refetch } = useGetMessagesByChatIdQuery(
    chatSelected?._id || "",
  );
  const [createMessage] = useCreateMessageMutation();
  const conversationRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Message>>({ text: "" });

  const handleSendMessage = async () => {
    const message = {
      ...form,
      chat_id: chatSelected?._id,
      sender_id: userCredentials.profile.email,
    };

    try {
      const response = await createMessage(message).unwrap();
      socket.emit("sendMessagesPrivate", {
        message: response,
        selectUser: friendSelected?._id,
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }

    setForm({ text: "" });
  };

  const handleOpenChat = async (friend: User, chat: iChat) => {
    setFriendSelected(friend);
    setChatSelected(chat);
    await refetch();
  };

  useEffect(() => {
    const handleSendMessage = async () => {
      await refetch();
      scrollToBottom();
    };

    socket.on("connect", () => console.log("Connected to socket"));
    socket.emit("register", userCredentials.profile.email);
    socket.on("sendMessage", handleSendMessage);

    return () => {
      socket.off("connect");
      socket.off("sendMessage", handleSendMessage);
    };
  }, [userCredentials.profile.email, refetch]);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 min-h-screen bg-gray-900">
        {/* Panel de chats */}
        <div className="col-span-1 border-r border-white">
          <ArrowBackIcon
            className="text-white text-3xl m-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-white text-center mb-4">CHATS</h2>
          <div className="overflow-y-auto">
            {myChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-white">
                <p className="text-lg mb-4">Aún no tienes chats disponibles.</p>
                <p className="text-sm text-gray-400">
                  Conéctate con tus amigos y comienza a chatear.
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Explorar usuarios
                </button>
              </div>
            ) : (
              myChats.map((chat, index) => {
                const [friendUser] = users.filter(
                  (user) =>
                    user._id ===
                    chat.members.find(
                      (memberId) => memberId !== userCredentials.id,
                    ),
                );

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border p-2 m-2 rounded cursor-pointer hover:bg-red-500"
                    onClick={() => handleOpenChat(friendUser, chat)}
                  >
                    <img
                      alt={`${friendUser?.first_name} ${friendUser?.last_name}`}
                      className="w-12 h-12 rounded-full"
                      src={
                        friendUser?.photo_url ||
                        "https://via.placeholder.com/150"
                      }
                    />
                    <p className="text-white text-center">
                      {friendUser?.first_name} {friendUser?.last_name}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Panel de mensajes */}
        <div className="col-span-4 flex flex-col h-screen">
          {chatSelected ? (
            <>
              <div className="flex items-center border-b border-white p-4">
                <img
                  alt="Friend"
                  className="w-16 h-16 rounded-full mr-4"
                  src={
                    friendSelected?.photo_url ||
                    "https://via.placeholder.com/150"
                  }
                />
                <h2 className="text-white text-2xl">
                  {`${friendSelected?.first_name} ${friendSelected?.last_name}`}
                </h2>
              </div>
              <div
                className="flex-1 overflow-y-auto p-4 bg-gray-800"
                ref={conversationRef}
              >
                {myMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 ${
                      message.sender_id === userCredentials.id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <p className="text-white p-2 bg-blue-700 rounded">
                      {message.text}
                    </p>
                    <span className="text-gray-400 text-xs">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center border-t border-white p-2">
                <input
                  value={form.text}
                  className="flex-1 p-2 rounded bg-gray-800 text-white"
                  placeholder="Escribe un mensaje..."
                  onChange={(e) => setForm({ text: e.target.value })}
                />
                <SendIcon
                  className="text-white text-3xl ml-2 cursor-pointer"
                  onClick={handleSendMessage}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-white">
              <p className="text-2xl">
                Seleccione un chat para comenzar a conversar.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
