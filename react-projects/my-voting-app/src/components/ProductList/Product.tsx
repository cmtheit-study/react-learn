import React from "react";

// 数据平面
export interface ProductPropData {
  id: number,
  title: string,
  description: string,
  url: string,
  votes: number,
  submitterAvatarUrl: string, // 发布者缩略头像
  productImageUrl: string,    // 产品图片
}

// 行为平面
export interface ProductPropAction {
  onVote: () => void
}

export type ProductProp = ProductPropData & ProductPropAction;

export function genProductImageUrl(productImageName: string): string {
  return `./images/products/products/${productImageName}`
}

export function genSubmitterAvatarUrl(submitterAvatarName: string): string {
  return `./images/products/avatars/${submitterAvatarName}`
}

export default function Product(
  {
    title,
    description,
    url,
    votes,
    submitterAvatarUrl,
    productImageUrl,
    onVote
  }: ProductProp) {
  return (
    <>
      <div className={"grid grid-cols-3 grid-rows-1 gap-10"}>
        <div className={"col-span-1"}>
          <img
            src={genProductImageUrl(productImageUrl)}
            alt={`产品${title}图片`}
          />
        </div>
        <div className={"flex flex-col justify-evenly items-start col-span-2"}>
          <div className={"col-span-2"}>
            <span
              className={"px-1 cursor-pointer selection:bg-none"}
              onClick={onVote}
            >
              👆🏻
            </span>
            <span className={"font-bold text-xl selection:bg-none"}>
              {votes}
            </span>
          </div>
          <div>
            <a className={"text-blue-600 no-underline hover:underline"} href={url}>
              {title}
            </a>
          </div>
          <div>{description}</div>
          <div>
            <span>发布者：</span>
            <span>
              <img
                className={"w-12 inline rounded-full"}
                src={genSubmitterAvatarUrl(submitterAvatarUrl)}
                alt={`产品${title}发布者头像`}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}