import React, {useState} from "react";
import {ProductList, ProductListPropData} from "./ProductList";
import {Title} from "./Title";

export function App(){
  const [productListProp, setProductListProp] = useState({
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
  } as ProductListPropData)

  function handleVote(productId: number) {
    const newProductListProp = {...productListProp};
    newProductListProp
      .lists
      .find((product) => product.id === productId)
      .votes++
    setProductListProp(newProductListProp)
  }

  return (
    <>
      <div className={"w-full"}>
        <div className={"m-auto w-4/5"}>
          <div className={"m-3"}>
            <Title content={"产品列表"} />
          </div>
          <ProductList lists={productListProp.lists} onVote={handleVote}/>
        </div>

      </div>
    </>
  )
}