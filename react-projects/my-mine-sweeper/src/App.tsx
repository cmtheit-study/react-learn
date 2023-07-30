import React, {createContext, useContext} from "react";
import { PlayArea } from "./PlayArea";
import { useImmerReducer } from "use-immer";
import {immerable} from "immer";
import { Title } from "./Title";

export namespace App {
    export namespace Game {
        // 管理游戏逻辑
        export class Obj {
            [immerable] = true
            data: {
                state: State.before | State.playing
            } | {
                state: State.end,
                res: Result
            }
            constructor() {
                this.data = {
                    state: State.before
                }
            }

            isEnd(): this is {
                data: {
                    state: State.end,
                    res: Result
                }
            } {
                return this.data.state === State.end;
            }

            isLose(): boolean {
                return this.isEnd() && this.data.res === Result.lose;
            }

            isWin(): boolean {
                return this.isEnd() && this.data.res === Result.win
            }

            gameOver(res: Result) {
                this.data= {
                    state: State.end,
                    res
                }
                switch (this.data.res) {
                    case Result.win:
                        alert("恭喜获胜！");
                        break;
                    case Result.lose:
                        alert("游戏结束！");
                        break;
                }
            }
        }

        export enum State {
            before,
            playing,
            end
        }

        export enum Result {
            win,
            lose
        }
         // 游戏结束
        export interface GameOverAction {
            type: 'gameOver',
            res: Result
        }

        export type Action = GameOverAction

        export function reducer(state: Game.Obj, action: Action) {
            console.log(state, action)
            switch (action.type) {
                case 'gameOver':
                    state.gameOver(action.res)
                    break;
            }
        }

        export namespace Ctx {
            export const obj = createContext(null);
            export const dispatchObj = createContext(null);

            export function useGameObj(): [Obj, React.Dispatch<Action>] {
                return [useContext(obj), useContext(dispatchObj)]
            }
        }
    }
    export function Cpn() {
        const [gameObj, dispatchGameObj] = useImmerReducer(Game.reducer, new Game.Obj());

        return (
            <>
                <Game.Ctx.obj.Provider value={gameObj}>
                    <Game.Ctx.dispatchObj.Provider value={dispatchGameObj}>
                        <div className={"flex flex-col items-center"}>
                            <Title.Cpn />
                            <PlayArea.Cpn row={10} col={10} boomNum={10}/>
                        </div>
                    </Game.Ctx.dispatchObj.Provider>
                </Game.Ctx.obj.Provider>
            </>
        )
    }
}