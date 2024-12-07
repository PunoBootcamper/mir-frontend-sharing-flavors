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

  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
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

  useEffect(() => {}, []);

  const [isConnected, setIsConnected] = useState(false); // puede ser usado para interfaz
  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.emit("register", userCredentials._id);
    socket.on("userExists", () => console.log("User already exists"));
    socket.on("login", () => console.log("Logueado correctamente"));
    // socket.on("chat_message", (data) => {
    //   setMensajes((mensajes) => [...mensajes, data]);
    // });
    socket.on("sendMessage", async () => {
      await refetch();
      scrollToBottom();
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, [refetch, userCredentials._id]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 min-h-screen bg-gray-900">
        {/* Sidebar de Chats */}
        <div className="col-span-1 border-r border-white p-4">
          <ArrowBackIcon
            className="text-white text-3xl mb-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-white text-center mb-4">CHATS</h2>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {myChatsSorted.map((chat, index) => {
              const friendUser = users.find(
                (user) =>
                  user._id ===
                  chat.members.find((id) => id !== userCredentials._id),
              );

              return (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-700"
                  onClick={() => {
                    if (friendUser) {
                      // Aseguramos que friendUser no sea undefined
                      handleOpenChat(friendUser, chat);
                    }
                  }}
                >
                  <p className="text-white">
                    {friendUser?.first_name} {friendUser?.last_name}{" "}
                    {isConnected ? "*" : "*"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Área de Mensajes */}
        <div className="col-span-4 p-4 flex flex-col">
          <div className="flex items-center mb-4">
            <h2 className="text-white text-2xl">
              {friendSelected
                ? `${friendSelected.first_name} ${friendSelected.last_name}`
                : "Selecciona un chat"}
            </h2>
          </div>

          <div
            className="flex-1 overflow-y-auto border p-4"
            ref={conversationRef}
          >
            {myMessagesSorted.map((message, index) => {
              const isFriend = message.sender_id !== userCredentials._id;
              return (
                <div
                  key={index}
                  className={`mb-2 ${isFriend ? "text-left" : "text-right"}`}
                >
                  <p
                    className={`inline-block p-2 rounded ${isFriend ? "bg-blue-500" : "bg-green-500"}`}
                  >
                    {message.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-l"
              placeholder="Escribe un mensaje..."
              value={form.text}
              onChange={({ target }) => {
                inputForm(target.value);
              }}
            />
            <SendIcon
              className="bg-blue-500 text-white p-2 rounded-r cursor-pointer"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
