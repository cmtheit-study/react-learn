import React from "react";

export interface TitleProp {
  content: string
}

export function Title({content}: TitleProp) {
  return (
    <>
      <h1 className={"text-3xl font-bold text-center"}>{content}</h1>
      <hr />
    </>
  )
}