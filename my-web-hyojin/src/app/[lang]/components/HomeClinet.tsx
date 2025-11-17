"use client";

import Toast from "./Toast";

interface Props {
  dict: { greeting: string };
}

export default function HomeClient({ dict }: Props) {
  return (
    <div>
      <Toast message="Put your Cursor on Stars!"  />
      <h1>{dict.greeting}</h1>
    </div>
  );
}