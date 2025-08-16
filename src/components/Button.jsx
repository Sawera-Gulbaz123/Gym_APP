import React from 'react'

export default function Button(props) {
    const {text, func}=props;
  return (
    <button
      onClick={func}
      className="px-8 py-4 mx-auto rounded-md bg-slate-950 text-white hover:bg-blue-400 blueShadow duration-300"
    >
      <p>{text}</p>
    </button>
  );
}
