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
  const { data: myChats = [] } = useGetChatsByUserIdQuery(userCredentials._id);
  const { data: users = [] } = useGetUsersQuery();
  const { data: myMessages = [], refetch } = useGetMessagesByChatIdQuery(
    chatSelected?._id || "",
  );
  const [createMessage] = useCreateMessageMutation();
  const navigate = useNavigate();
  const conversationRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollToBottom = (smooth = false) => {
    if (conversationRef.current) {
      if (smooth) {
        conversationRef.current.scrollTo({
          top: conversationRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        conversationRef.current.scrollTop =
          conversationRef.current.scrollHeight;
      }
    }
  };

  const newDate = (data: string) => {
    const dateMongoDB = new Date(data);
    const hour = dateMongoDB.getHours().toString().padStart(2, "0");
    const minute = dateMongoDB.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const sortData = <T extends Message | iChat>(data: T[]): T[] => {
    const sortedData = [...data].sort((a, b) => {
      const fechaA = new Date(a.updatedAt).getTime();
      const fechaB = new Date(b.updatedAt).getTime();
      return fechaA - fechaB;
    });
    if (data.length > 0 && "members" in data[0]) {
      return sortedData.reverse() as T[];
    }
    return sortedData;
  };

  const myChatsSorted = sortData(myChats);
  const myMessagesSorted = sortData(myMessages);

  const [form, setForm] = useState<Partial<Message>>({
    text: "",
  });

  const inputForm = (t: string) => {
    setForm({
      text: t,
    });
  };

  const handleSendMessage = async () => {
    const message = {
      ...form,
      chat_id: chatSelected?._id,
      sender_id: userCredentials._id,
    };

    try {
      const response = await createMessage(message).unwrap();
      socket.emit("sendMessagesPrivate", {
        message: response,
        selectUser: friendSelected?._id,
      });
      scrollToBottom(true);
    } catch (error) {
      alert(JSON.stringify(error));
    }

    setForm({
      text: "",
    });
  };

  const handleOpenChat = async (friend: User, chat: iChat) => {
    setFriendSelected(friend);
    setChatSelected(chat);
    await refetch();
  };

  const handleScroll = () => {
    if (conversationRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = conversationRef.current;
      setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 50);
    }
  };

  useEffect(() => {
    socket.on("connect", () => console.log("Conectado al socket"));
    socket.emit("register", userCredentials._id);
    socket.on("userExists", () => console.log("User already exists"));
    socket.on("login", () => console.log("Logueado correctamente"));
    socket.on("sendMessage", async () => {
      await refetch();
      scrollToBottom(true);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, [refetch, userCredentials._id]);

  useEffect(() => {
    if (!isUserScrolling) {
      scrollToBottom(true);
    }
  }, [myMessagesSorted]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (conversationRef.current) {
        conversationRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 min-h-screen bg-gray-900 pt-20">
        {/* Sidebar de Chats */}
        <div className="col-span-1 border-r border-gray-700 p-4">
          <ArrowBackIcon
            className="text-white text-3xl mb-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-white text-center mb-4 text-xl font-semibold">
            CHATS
          </h2>
          <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            {myChatsSorted.map((chat, index) => {
              const friendUser = users.find(
                (user) =>
                  user._id ===
                  chat.members.find((id) => id !== userCredentials._id),
              );

              return (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-800 rounded-lg"
                  onClick={() => {
                    if (friendUser) handleOpenChat(friendUser, chat);
                  }}
                >
                  <p className="text-white font-medium">
                    {friendUser?.first_name} {friendUser?.last_name}{" "}
                    <span className="text-green-500 text-sm">●</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Área de Mensajes */}
        <div className="col-span-4 flex flex-col">
          <div className="flex items-center p-4 bg-gray-800">
            <h2 className="text-xl font-bold text-white">
              {friendSelected
                ? `${friendSelected.first_name} ${friendSelected.last_name}`
                : "Selecciona un chat"}
            </h2>
          </div>

          {/* Contenedor de Mensajes con Scroll */}
          <div
            className="flex-1 overflow-y-auto p-4 bg-gray-700"
            ref={conversationRef}
            style={{ maxHeight: "calc(100vh - 180px)" }} // Ajusta la altura para que solo el área de mensajes tenga scroll
          >
            {myMessagesSorted.map((message, index) => {
              const isFriend = message.sender_id !== userCredentials._id;
              return (
                <div
                  key={index}
                  className={`mb-4 flex ${isFriend ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      isFriend
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-gray-300">
                      {newDate(message.updatedAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Campo para Escribir Mensajes */}
          <div className="p-4 bg-gray-800 flex">
            <input
              type="text"
              className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white focus:outline-none"
              placeholder="Escribe un mensaje..."
              value={form.text}
              onChange={({ target }) => inputForm(target.value)}
            />
            <button
              className="p-3 bg-blue-600 rounded-r-lg text-white hover:bg-blue-500"
              onClick={handleSendMessage}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
