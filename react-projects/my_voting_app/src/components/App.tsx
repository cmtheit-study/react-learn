import React from "react";
import {ProductList, ProductListProp} from "./ProductList";
import {Title} from "./Title";

const productListProp: ProductListProp = {
  lists: [{
    id: 1,
    title: "Yellow Pail",
    votes: 30,
    url: '#',
    description: "On-demand sand castle construction expertise.",
    submitterAvatarUrl: "daniel.jpg",
    productImageUrl: "image-aqua.png",
  }, {
    id: 2,
    title: "Tinfoild: Tailored tinfoil hats",
    votes: 40,
    url: '#',
    description: "We already have your measurements and shipping address.",
    submitterAvatarUrl: "veronika.jpg",
    productImageUrl: "image-steel.png",
  },]
}

export function App(){
    return (
      <>
        <div className={"w-full"}>
          <div className={"m-auto w-4/5"}>
            <div className={"m-3"}>
              <Title content={"产品列表"} />
            </div>
            <ProductList lists={productListProp.lists}/>
          </div>

        </div>
      </>
    )
}