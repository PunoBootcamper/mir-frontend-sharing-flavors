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

const socket = io(import.meta.env.VITE_API_URL);

const Chat = () => {
  const navigate = useNavigate();

  // Obtener credenciales del usuario autenticado
  const isUserAuthenticated = localStorage.getItem("user");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);

  // Estado del componente
  const [friendSelected, setFriendSelected] = useState<User>();
  const [chatSelected, setChatSelected] = useState<iChat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [form, setForm] = useState<Partial<Message>>({ text: "" });
  const conversationRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  // Queries
  const { data: myChats = [] } = useGetChatsByUserIdQuery(userCredentials._id);
  const { data: users = [] } = useGetUsersQuery();
  const { data: myMessages = [], refetch } = useGetMessagesByChatIdQuery(
    chatSelected?._id || "",
    { skip: !chatSelected?._id },
  );
  const [createMessage] = useCreateMessageMutation();

  // Función para ordenar datos
  const sortData = <T extends Message | iChat>(data: T[]): T[] =>
    [...data].sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    );

  useEffect(() => {
    if (myMessages) {
      const sorted = sortData(myMessages);
      setMessages((prevMessages) => {
        if (JSON.stringify(prevMessages) !== JSON.stringify(sorted)) {
          return sorted;
        }
        return prevMessages;
      });
    }
  }, [myMessages]);

  // Scroll al final del contenedor
  const scrollToBottom = (smooth = false) => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // Manejo de eventos de scroll
  const handleScroll = () => {
    if (conversationRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = conversationRef.current;
      setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 50);
    }
  };

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!form.text?.trim()) return;

    const message: Message = {
      ...form,
      chat_id: chatSelected?._id,
      sender_id: userCredentials._id,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await createMessage(message).unwrap();
      setMessages((prev) => [...prev, response]);
      socket.emit("sendMessagesPrivate", {
        message: response,
        selectUser: friendSelected?._id,
      });
      setForm({ text: "" });
      scrollToBottom(true);
    } catch (error) {
      alert(`Error al enviar el mensaje: ${error}`);
    }
  };

  // Abrir un chat
  const handleOpenChat = async (friend: User, chat: iChat) => {
    if (!chat?._id) {
      try {
        await refetch();
      } catch (error) {
        console.error("Error al realizar refetch:", error);
      }
    }
    setFriendSelected(friend);
    setChatSelected(chat);
  };

  // Manejo de eventos de socket
  useEffect(() => {
    socket.on("connect", () => console.log("Conectado al socket"));
    socket.emit("register", userCredentials._id);

    socket.on("sendMessage", async () => {
      await refetch(); // Refetch solo si es necesario
      if (!isUserScrolling) scrollToBottom(true);
    });

    return () => {
      socket.off("connect");
      socket.off("sendMessage");
    };
  }, [userCredentials._id, isUserScrolling]);

  //Lista de usuarios activos
  useEffect(() => {
    socket.on("activeSessions", (users: Record<string, string>) => {
      setActiveUsers(Object.keys(users));
    });

    return () => {
      socket.off("activeSessions");
    };
  }, []);

  // Scroll automático al recibir mensajes
  useEffect(() => {
    if (!isUserScrolling) scrollToBottom(true);
  }, [messages]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      conversationRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Formatear fecha
  const formatTime = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();

    // Verificar si la fecha del mensaje es hoy
    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return `${messageDate.getDate().toString().padStart(2, "0")}/${(
        messageDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${messageDate.getFullYear().toString().slice(-2)}`;
    }
  };

  const myChatsSorted = sortData(myChats);

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
                    <span
                      className={`text-sm ${activeUsers.includes(friendUser?._id || "") ? "text-green-500" : "text-gray-500"}`}
                    >
                      ●
                    </span>
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

          {/* Contenedor de Mensajes */}
          <div
            className="flex-1 overflow-y-auto p-4 bg-gray-700"
            ref={conversationRef}
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            {chatSelected ? (
              messages.map((message, index) => {
                const isFriend = message.sender_id !== userCredentials._id;
                return (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      isFriend ? "justify-start" : "justify-end"
                    }`}
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
                        {formatTime(message.updatedAt)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Selecciona un chat para comenzar la conversación.
              </div>
            )}
          </div>
          {/* Campo para Escribir Mensajes */}

          {chatSelected && (
            <div className="p-4 bg-gray-800 flex">
              <input
                type="text"
                className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white focus:outline-none"
                placeholder="Escribe un mensaje..."
                value={form.text}
                onChange={({ target }) => setForm({ text: target.value })}
              />
              <button
                className="p-3 bg-blue-600 rounded-r-lg text-white hover:bg-blue-500"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
