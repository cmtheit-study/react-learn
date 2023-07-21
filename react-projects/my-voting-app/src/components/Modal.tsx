import React, {useState} from "react";

export default function Modal({ title, show, onHide, children }) {
  return (
    <>
      <div
        className={"fixed left-0 top-0 w-screen h-screen transition-all"}
        style={{
          background: show ? "rgba(100, 100, 100, 0.2)" : "transparent",
          zIndex: show ? "10": "-1"
        }}
      >
        <div
          className={"w-96 relative m-auto bg-white transition-all p-2 overflow-auto"}
          style={{
            top: show ? "10%" : "-100%",
            height: "60%"
          }}
        >
           <div className={"flex flex-col items-center h-full"}>
            <h1 className={"font-bold text-2xl text-center"}>
              {title}
            </h1>
            <div className={"w-4/5 flex-1"}>
              {children}
            </div>
            <div>
              <button
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                onClick={onHide}
              >
                我知道了
              </button>
            </div>
        </div>

        </div>
      </div>
    </>
  )
}