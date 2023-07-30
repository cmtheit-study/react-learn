import React, {createContext, useContext} from "react";
import {Mine} from "./PlayArea/MineSpace/Mine";
import {random, range} from "lodash";
import {Updater, useImmer} from "use-immer";
import {immerable} from "immer";
import {MineSpace} from "./PlayArea/MineSpace";
import {App} from "./App";

type MineData = Mine.BoomData | Mine.NBoomData

class MineMatrix {
    data: MineData[][];
    [immerable] = true;
    checked = 0;

    constructor(
        public readonly row: number,
        public readonly col: number,
        private readonly boomNum: number
    ) {
        this.data = range(row).map(i =>
            range(col).map(j => {
                return {
                    type: i * col + j < boomNum ? Mine.Type.boom : Mine.Type.nBoom,
                    state: 'unchecked'
                }
            })
        )
    }

    get mineNumber() {
        return this.row * this.col;
    }

    randomize() {
        range(this.row).forEach(i => {
            range(this.col).forEach(j => {
                const exchangeIdx = random(i * this.row + j, (this.row - 1) * (this.col - 1));
                const [ei, ej] = [Math.floor(exchangeIdx / this.col), exchangeIdx - Math.floor(exchangeIdx / this.col) * this.col];
                [this.data[i][j], this.data[ei][ej]] = [this.data[ei][ej], this.data[i][j]];
            });
        })
    }

    getData(pos: [number, number]): MineData
    getData(i: number, j: number): MineData
    getData(posOrI: [number, number] | number, j?: number): MineData {
        if (posOrI instanceof Array) {
            return this.data[posOrI[0]][posOrI[1]]
        } else {
            return this.data[posOrI][j];
        }
    }

    // 返回 [i, j] 块周围的炸弹区域和非炸弹区域
    getSurround(i: number, j: number): [[number, number][], [number, number][]] {
        const data = this.getData(i, j);
        switch (data.type) {
            case Mine.Type.boom:
                throw Error("Cannot get surround number of a boom!");
            case Mine.Type.nBoom:
                const surroundBooms = []
                const surroundNBooms = []
                range(i - 1, i + 2).forEach(r => {
                    if (this.data[r]) {
                        range(j - 1, j + 2).forEach(c => {
                            if (this.data[r][c]) {
                                if (this.getData(r, c).type === Mine.Type.boom) {
                                    surroundBooms.push([r, c])
                                } else {
                                    surroundNBooms.push([r, c])
                                }
                            }
                        })
                    }
                })
                return [surroundNBooms, surroundBooms];
            default:
                throw Error('Unknown type of mine.');
        }
    }

    check(i: number, j: number, purpose?: boolean) {
        const data = this.getData(i, j);
        switch (data.state) {
            case "unchecked":
            case "flagged":
                switch (data.type) {
                    case Mine.Type.boom:
                        data.state = 'boomed';
                        data.isMainBoom = !!purpose;
                        if (data.isMainBoom) {
                            this.data.forEach((rowData, r) => {
                                rowData.forEach((data, c) => {
                                    if (data.type === Mine.Type.boom && r !== i && c !== j) {
                                        this.check(r, c, false)
                                    }
                                })
                            })
                        }
                        break;
                    case Mine.Type.nBoom:
                        const [surroundNBooms, surroundBooms] = this.getSurround(i, j);
                        data.state = "checked";
                        this.checked++;
                        if (surroundBooms.length === 0) {
                            surroundNBooms.forEach(([posI, posJ]) => {
                                this.check(posI, posJ)
                            })
                        }
                        data.surround = surroundBooms.length;
                        break;
                }
                break;
            case "boomed":
            case "checked":
            default:
                break
        }
    }

    flag(i: number, j: number) {
        switch (this.data[i][j].state) {
            case "flagged":
                this.data[i][j].state = 'unchecked';
                break
            case "unchecked":
                this.data[i][j].state = 'flagged';
                break
            default:
                throw Error(`Cannot flag or un-flag mine ${[i, j]}`)
        }
    }
}

/**
 * PlayArea 组件
 * 处理游戏主体逻辑
 */
export namespace PlayArea {
    // 上下文
    export namespace Ctx {
        export const mineMatrix = createContext<MineMatrix>(null);
        export const updateMineMatrix = createContext<Updater<MineMatrix>>(null);
        export function useMineMatrix(): [MineMatrix, Updater<MineMatrix>] {
            return [useContext(mineMatrix), useContext(updateMineMatrix)]
        }
    }

    // 属性
    export namespace Prop {
        export interface Data {
            row: number,
            col: number,
            boomNum: number
        }
        export interface Action {
        }
        export type T = Data & Action;
    }

    /// 组件
    export function Cpn({ row, col, boomNum }: Prop.T) {
        const initialMineMatrix = React.useMemo(() => {
            const matrix = new MineMatrix(row, col, boomNum);
            matrix.randomize();
            return matrix;
        }, [row, col, boomNum]);

        const [mineMatrix, updateMineMatrix] = useImmer<MineMatrix>(initialMineMatrix);
        return (
            <>
                <Ctx.mineMatrix.Provider value={mineMatrix}>
                    <Ctx.updateMineMatrix.Provider value={updateMineMatrix}>
                        <div>
                            <MineSpace.Cpn />
                        </div>
                    </Ctx.updateMineMatrix.Provider>
                </Ctx.mineMatrix.Provider>
            </>
        )
    }
}