import React, {useState} from "react";
import ProductList, {ProductListPropData} from "./ProductList";
import Title from "./Title";
import Modal from "./Modal";
import {genSubmitterAvatarUrl, ProductPropData} from "./ProductList/Product";

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
    }]
  } as ProductListPropData)

  const [modalShow, setModalShow] = useState(false)
  const [approvedSubmitter, setApprovedSubmitter] = useState<ProductPropData | null>(null)

  function handleVote(productId: number) {
    const newProductListProp = {...productListProp};
    const product = newProductListProp
      .lists
      .find((product) => product.id === productId)
    product.votes++;
    setProductListProp(newProductListProp)
    setModalShow(true)
    setApprovedSubmitter(product)
  }

  return (
    <>
      <div className={"w-full"}>
        <div className={"m-auto w-4/5"} style={{maxWidth: "50em"}}>
          <div className={"m-3"}>
            <Title content={"产品列表"} />
          </div>
          <ProductList {...productListProp} onVote={handleVote}/>
        </div>
        <Modal
          title={"投票成功"}
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <div className={"flex flex-col items-center h-full justify-between"}>
            <div>
              恭喜投票成功
            </div>
            <div>
              <img
                className={"w-40 rounded-full"}
                src={genSubmitterAvatarUrl(approvedSubmitter?.submitterAvatarUrl)}
                alt={`${approvedSubmitter?.title}的发布者头像`}
              />
            </div>
            <div className={"m-2 text-2xl font-bold"}>
              感谢您的支持！
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}