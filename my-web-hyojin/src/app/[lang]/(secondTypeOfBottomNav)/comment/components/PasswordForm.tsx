'use client';

import { useState } from "react";

interface PasswordFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (inputPw: string) => void;
}

export default function PasswordForm({ visible, onClose, onSubmit }: PasswordFormProps) {
  const [inputPw, setInputPw] = useState("");
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div className="relative w-[500px] rounded-lg bg-white/5 backdrop-blur border border-gray-100/10 shadow-2xl p-8 flex flex-col gap-5 items-center animate-fadeIn">
        <button onClick={() => { setInputPw(""); onClose(); }} 
          className="absolute right-5 top-5 text-white text-2xl opacity-70 hover:opacity-100 transition">
            &times;
        </button>
        <h3 className="text-lg text-white tracking-wide mb-1">
          Password
        </h3>
        <input type="password" value={inputPw} onChange={e => setInputPw(e.target.value)}
          className="w-full px-4 py-3 rounded-md border-none outline-none bg-white/10 focus:bg-white/30 backdrop-blur text-base font-medium placeholder:text-gray-300 transition"
          placeholder="Password here" autoFocus />
        <div className="flex w-full justify-end gap-2 pt-2">
          <button onClick={() => { setInputPw(""); onClose(); }} 
            className="px-5 py-2 rounded-full bg-white/30 text-sm text-white hover:bg-white/50 transition backdrop-blur">
              Back
          </button>
          <button onClick={() => { onSubmit(inputPw); setInputPw(""); }} 
            className="px-6 py-2 rounded-full border text-sm border-gray-400 text-white shadow hover:bg-gray-300 transition">
              Delete
          </button>
        </div>
      </div>
    </div>
  );
}
