import React from "react";
import {Mine} from "./MineSpace/Mine";

export namespace MineSpace {

  export interface PropData {
    mineMatrix: Mine.PropData[][],   // 从左上角往右下角，从0行0列到最大行最大列
  }

  export interface PropAction {
    onCheckMine(row: number, col: number): void,    // 点击区域，将该区域的行下标和列下标传给父组件
    onFlagMine(row: number, col: number): void,     // 给地雷区标旗
  }

  export type Prop = PropData & PropAction;

  export function Component({mineMatrix, onCheckMine, onFlagMine}: Prop) {
    const mines = mineMatrix.map((rowMinesData, i) => {
      const rowMines = rowMinesData.map((mineData, j) => {
        return (
          <>
            <Mine.Component {...mineData} onCheck={() => onCheckMine(i, j)} onFlag={() => onFlagMine(i, j)} key={j}/>
          </>
        )
      })
      return (
        <>
          <div className={"flex flex-nowrap"} key={i}>
            {rowMines}
          </div>
        </>
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