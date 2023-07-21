import React from "react";
import {Product, ProductProp, ProductPropData} from "./ProductList/Product";

// 数据平面
export interface ProductListPropData {
  lists: ProductPropData[],
}

// 行为平面
export interface ProductListPropAction {
  onVote: (productId: number) => void
}

export type ProductListProp = ProductListPropData & ProductListPropAction;

export function ProductList({lists, onVote}: ProductListProp) {
  const products = lists.map((data) => {
    return (
      <div className={"p-2"} key={data.id}>
        <Product
          {...data}
          onVote={() => onVote(data.id)}
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