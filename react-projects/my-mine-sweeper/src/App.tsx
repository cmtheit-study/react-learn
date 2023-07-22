import React from "react";
import {PlayArea} from "./PlayArea";

export enum GameState {

}

export default function App() {
    return (
        <>
            <div>
                <PlayArea.Component row={10} col={10} boomNum={10} onGameOver={() => {
                    alert("游戏结束！")
                }}/>
            </div>
        </>
    )
}