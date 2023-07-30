import React from "react";
import {Mine} from "./MineSpace/Mine";
import {PlayArea} from "../PlayArea";

export namespace MineSpace {

  export namespace Prop {
    export interface Data {
    }
    export interface Action {
    }
    export type T = Data & Action;
  }

  export function Cpn({}: Prop.T) {
    const [mineMatrix, updateMineMatrix] = PlayArea.Ctx.useMineMatrix();
    const mines = mineMatrix.data.map((rowMinesData, i) => {
      const rowMines = rowMinesData.map((_, j) => {
        return (
          <Mine.Cpn i={i} j={j} key={j}/>
        )
      })
      return (
        <div className={"flex flex-nowrap"} key={i}>
          {rowMines}
        </div>
      )
    })

    return (
      <>
        <div className={"flex flex-col flex-nowrap"}>
          {mines}
        </div>
      </>
    )
  }
}