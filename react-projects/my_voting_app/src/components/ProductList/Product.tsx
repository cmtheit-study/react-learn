import React from "react";

export interface ProductProp {
  id: number,
  title: string,
  description: string,
  url: string,
  votes: number,
  submitterAvatarUrl: string, // 发布者缩略头像
  productImageUrl: string,    // 产品图片
}

export function Product(
  {
    id,
    title,
    description,
    url,
    votes,
    submitterAvatarUrl,
    productImageUrl
  }: ProductProp) {

  return (
    <>
      <div className={"grid grid-cols-3 grid-rows-1 gap-10"}>
        <div className={"col-span-1"}>
          <img
            src={`/assets/images/products/products/${productImageUrl}`}
            alt={`产品${title}图片`}
          />
        </div>
        <div className={"flex flex-col justify-around items-start col-span-2"}>
          <div className={"col-span-2"}>
            👆🏻
            <span className={"font-bold text-xl"}>
              {votes}
            </span>
          </div>
          <div>
            <a className={"no-underline hover:underline"} href={url}>
              {title}
            </a>
          </div>
          <div>{description}</div>
          <div>
            <span>发布者：</span>
            <span>
              <img
                className={"w-12 inline rounded-full"}
                src={`/assets/images/products/avatars/${submitterAvatarUrl}`}
                alt={`产品${title}发布者头像`}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}