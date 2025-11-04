"use client";

import Toast from "./Toast";

export default function HomeClient({ dict }: { dict: any }) {
  return (
    <div>
      <Toast />
      <h1>{dict.greeting}</h1>
    </div>
  );
}