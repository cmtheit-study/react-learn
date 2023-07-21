import React from "react";
import {Product, ProductProp} from "./ProductList/Product";

export interface ProductListProp {
  lists: ProductProp[]
}

export function ProductList({lists}: ProductListProp) {
  const products = lists.map((data) => {
    return (
      <div className={"p-2"} key={data.id}>
        <Product
          id={data.id}
          title={data.title}
          description={data.description}
          url={data.url}
          votes={data.votes}
          submitterAvatarUrl={data.submitterAvatarUrl}
          productImageUrl={data.productImageUrl}
        />
      </div>
      //todo: 这里怎么减少冗余代码？？
    )
  })
  return (
    <>
      <div className={"flex flex-col"}>
        {products}
      </div>
    </>
  )
}