"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, collection, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { Menu, X, Send } from 'lucide-react';

// --- Firebase Initialization (Standard Canvas Setup) ---
// Initialize global variables for Firebase configuration
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-chat-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Helper function to initialize Firebase services and authentication
const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    // Auth logic: use custom token if available, otherwise sign in anonymously
    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
    } else {
      await signInAnonymously(auth);
    }
    
    return { db, auth };
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return { db: null, auth: null };
  }
};

// --- Component Definitions ---

/**
 * GuestSidebar component: Displays user/app information. 
 * This component was previously undefined, causing the ReferenceError.
 */
const GuestSidebar = ({ userId }) => {
  return (
    <div className="p-4 bg-white/70 backdrop-blur-sm h-full flex flex-col items-center justify-center text-center rounded-xl shadow-2xl border border-indigo-200/50">
      <h3 className="text-xl font-extrabold text-indigo-700 mb-2">Welcome to the Chat!</h3>
      <p className="text-sm text-gray-600 mb-4">
        You are currently connected to the public chat room. Messages are visible to all users of this app.
      </p>
      <div className="text-xs font-mono text-gray-500 p-3 bg-gray-100 rounded-lg break-all shadow-inner">
        <span className="font-bold text-gray-700">Your Current ID:</span> {userId || 'Loading...'}
      </div>
    </div>
  );
};

/**
 * ChatRoom component: Handles message fetching and sending using Firestore.
 */
const ChatRoom = ({ db, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Firestore path for public chat room
  const publicPath = `artifacts/${appId}/public/data/messages`;

  // Real-time message fetching using onSnapshot
  useEffect(() => {
    // Only run if Firebase DB and user ID are ready
    if (!db || !userId) return;

    // Create a query for the messages collection
    const messagesQuery = query(collection(db, publicPath));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        // Sort in memory by creation time to avoid index creation issues
        .sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)); 

      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [db, userId, publicPath]);


  const sendMessage = useCallback(async (e) => {
    e.preventDefault();
    const textToSend = newMessage.trim();
    if (!db || !textToSend) return;

    try {
      // Add a new document to the messages collection
      await addDoc(collection(db, publicPath), {
        text: textToSend,
        createdAt: serverTimestamp(),
        userId: userId,
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [db, newMessage, userId, publicPath]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-indigo-600 font-medium">Loading Chat History...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl border border-gray-200/50 p-4">
      <h2 className="text-2xl font-black text-indigo-700 mb-4 border-b-4 border-indigo-100 pb-2">Public Chat Room</h2>
      
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 custom-scrollbar">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 p-4 bg-indigo-50 rounded-lg">Be the first to send a message!</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] p-3 rounded-xl shadow-lg transition duration-200 ease-in-out transform hover:scale-[1.01] ${
                  msg.userId === userId
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}
              >
                <div className={`text-xs font-bold mb-1 ${msg.userId === userId ? 'text-indigo-200' : 'text-indigo-500'}`}>
                  {msg.userId === userId ? 'You' : `User ID: ${msg.userId.substring(0, 8)}...`}
                </div>
                <p className="text-sm break-words leading-relaxed">{msg.text}</p>
                <div className={`text-xs mt-1 text-right italic ${msg.userId === userId ? 'text-indigo-300' : 'text-gray-500'}`}>
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="mt-4 flex space-x-2 border-t pt-4 border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 shadow-inner"
          disabled={!db}
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={!db || !newMessage.trim()}
          className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-300 flex items-center justify-center font-bold uppercase tracking-wider"
          aria-label="Send message"
        >
          <Send size={20} className="mr-2" /> Send
        </button>
      </form>
    </div>
  );
};


/**
 * App (formerly MainApp): The main application wrapper.
 */
export default function App() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Initialize Firebase and Authentication
  useEffect(() => {
    // Call the async initialization helper
    initFirebase().then(services => {
      setDb(services.db);
      setAuth(services.auth);
    });
  }, []);

  // 2. Auth State Listener
  useEffect(() => {
    if (!auth) return;

    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setIsAuthReady(true);
      console.log("Firebase Auth State Changed. User ID:", user?.uid);
    });

    return () => unsubscribe();
  }, [auth]);

  // Show a loading screen while authentication is in progress
  if (!isAuthReady) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="mt-4 text-xl font-semibold text-indigo-700">Establishing Secure Connection...</p>
        <p className="text-sm text-gray-500 mt-2">Authenticating with Firebase services.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-4 sm:p-6 font-sans">
      <style jsx global>{`
        /* Custom scrollbar for message area */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #93c5fd; /* blue-300 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f0f4ff; /* indigo-50 */
        }
      `}</style>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition duration-150 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex h-[calc(100vh-3rem)] max-w-7xl mx-auto gap-6">
        
        {/* Sidebar (Responsive) */}
        <div className={`
          lg:block w-full lg:w-1/4 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'fixed inset-0 z-40 bg-indigo-50/95 p-4 lg:relative lg:p-0 transform translate-x-0' : 'hidden'}
          lg:translate-x-0
        `}>
          <div className="h-full">
            {/* GuestSidebar component call, now correctly defined */}
            <GuestSidebar userId={userId} />
          </div>
        </div>
        
        {/* Click overlay to close sidebar on mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}


        {/* Main Content (Chat Room) */}
        <div className="flex-1 w-full lg:w-3/4">
          {/* Ensure ChatRoom only renders if db and userId are available */}
          {db && userId ? (
            <ChatRoom db={db} userId={userId} />
          ) : (
            <div className="flex justify-center items-center h-full bg-white rounded-xl shadow-lg">
              <p className="text-xl text-red-500">Error: Could not connect to database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}