'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Comment } from "@/types/Comment";
import Link from "next/link";
import PasswordForm from "./PasswordForm";

export default function CommentCard() {
  const [entries, setEntries] = useState<Comment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);
  const [currentPw, setCurrentPw] = useState<string>("");

  const fetchEntries = async () => {
    const snapshot = await getDocs(collection(db, "comments"));
    const list: Comment[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Comment));
    setEntries(
      list.sort((a, b) => 
        b.date.toDate().getTime() - a.date.toDate().getTime()
      )
    );
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string | undefined, pw: string) => {
    if (!id) return;
    setCurrentDeleteId(id);
    setCurrentPw(pw);
    setModalVisible(true);
  };

  return (
    <div className="relative w-2/5 min-h-screen flex justify-center mt-8 p-2 mb-10">
      <p className="text-white text-9xl font-extrabold mt-4 z-1 fixed">Comment!</p>
      <div className="space-y-6 flex flex-col items-center w-full max-w-xl mx-auto z-50 mt-24">
        {entries.map((comment) => (
          <div key={comment.id} className="relative p-6 rounded-xl bg-white/20 backdrop-blur shadow-2xl flex flex-col gap-2 transition hover:scale-[1.01] w-full">
            <p className="text-white text-lg mb-4 mt-2">{comment.content}</p>
            <div className="flex justify-between gap-4 text-gray-100 font-light text-xs">
              <div className="text-gray-300 hover:text-white">
                <span>{comment.author} </span>
                <span> {comment.date.toDate().toLocaleDateString()}</span>
              </div>
              <button 
                onClick={() => handleDelete(comment.id, comment.password)} 
                className="text-gray-300 hover:text-white text-xs backdrop-blur rounded-xl px-2 py-1 font-medium shadow animate-shaking"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link href="/comment/post"
        className="fixed bottom-8 right-8 bg-white/30 backdrop-blur-lg text-white text-sm px-6 py-3 rounded-full shadow-2xl hover:bg-white/50 hover:text-black transition-colors z-50">
        Leave a comment
      </Link>

      {/* 모달 */}
      <PasswordForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={async (inputPw) => {
          if (currentDeleteId && inputPw === currentPw) {
            await deleteDoc(doc(db, "comments", currentDeleteId));
            fetchEntries();
          } else {
            alert("Incorrect password. Please try again.");
          }
          setModalVisible(false);
        }}
      />
    </div>
  );
}