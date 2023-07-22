import React from "react";
import {Mine} from "./PlayArea/MineSpace/Mine";
import {range, random} from "lodash";
import {useImmer} from "use-immer";
import {immerable} from "immer";
import {MineSpace} from "./PlayArea/MineSpace";

interface MineData extends Mine.PropData {
    isBoom: boolean
}

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
                    isBoom: i * col + j < boomNum,
                    isMainBoom: false,
                    state: Mine.getState("plain"),
                    aroundMineNum: 0
                }
            })
        )
        this.boomNum = boomNum
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

    getData(pos: [number, number])
    getData(i: number, j: number)
    getData(posOrI: [number, number] | number, j?: number) {
        if (posOrI instanceof Array) {
            return this.data[posOrI[0]][posOrI[1]]
        } else {
            return this.data[posOrI][j];
        }
    }

    /**
     * @param i row of check
     * @param j col to check
     * @return weather check boom
     */
    check(i: number, j: number): boolean {
        if (this.data[i][j].state.name !== "checked") {
            if (!this.data[i][j].isBoom) {
                let cnt = 0;  // 雷数
                const around: [number, number][] = []
                if (i > 0) {
                    around.unshift([i - 1, j])
                    if (this.getData(around[0]).isBoom) {
                        cnt++;
                    }
                    if (j > 0) {
                        around.unshift([i - 1, j - 1])
                        if (this.getData(around[0]).isBoom) {
                            cnt++;
                        }
                    }
                    if (j < this.col - 1) {
                        around.unshift([i - 1, j + 1])
                        if (this.getData(around[0]).isBoom) {
                            cnt++;
                        }
                    }
                }
                if (i < this.row - 1) {
                    around.unshift([i + 1, j])
                    if (this.getData(around[0]).isBoom) {
                        cnt++;
                    }
                    if (j > 0) {
                        around.unshift([i + 1, j - 1])
                        if (this.getData(around[0]).isBoom) {
                            cnt++;
                        }
                        if (j < this.col - 1) {
                            around.unshift([i + 1, j + 1])
                            if (this.getData(around[0]).isBoom) {
                                cnt++;
                            }
                        }
                    }
                }
                if (j > 0) {
                    around.unshift([i, j - 1])
                    if (this.getData(around[0]).isBoom) {
                        cnt++;
                    }
                    if (j < this.col - 1) {
                        around.unshift([i, j + 1])
                        if (this.getData(around[0]).isBoom) {
                            cnt++;
                        }
                    }
                }
                this.data[i][j].aroundMineNum = cnt;
                this.data[i][j].state = Mine.getState("checked")
                this.checked++;
                if (cnt === 0) {
                    around.forEach(([i, j]) => {
                        this.check(i, j)
                    })
                }
                if (this.checked === this.mineNumber - this.boomNum) {

                }
            } else {
                this.data[i][j].isMainBoom = true
                range(this.row).forEach(i => {
                    range(this.col).forEach(j => {
                        // 所有炸弹全部爆炸
                        if (this.data[i][j].isBoom) {
                            this.data[i][j].state = Mine.getState("boom")
                        }
                    });
                });
                return true;
            }
        }
        return false;
    }

    flag(i: number, j: number) {
        switch (this.data[i][j].state.name) {
            case "flagged":
                this.data[i][j].state = Mine.getState("plain");
                break
            case "plain":
                this.data[i][j].state = Mine.getState("flagged");
                break
        }
    }
}

/**
 * 处理游戏主体逻辑
 */
export namespace PlayArea {
    export interface PropData {
        row: number,
        col: number,
        boomNum: number
    }

    export interface PropAction {
        onGameOver(): void
    }

    export type Prop = PropData & PropAction;

    export function Component({ row, col, boomNum, onGameOver }: Prop) {
        const initialMineMatrix = new MineMatrix(row, col, boomNum);
        initialMineMatrix.randomize();

        const [mineMatrix, updateMineMatrix] = useImmer<MineMatrix>(initialMineMatrix);
        function handleCheckMine(i: number, j: number) {
            updateMineMatrix(mm => {
                if (mm.check(i, j)) {
                    onGameOver();
                }
            })
        }

        function handleFlagMine(i: number, j: number) {
            updateMineMatrix(mm => {
                mm.flag(i, j);
            })
        }

        return (
            <>
                <div>
                    <MineSpace.Component mineMatrix={mineMatrix.data} onCheckMine={handleCheckMine} onFlagMine={handleFlagMine}/>
                </div>
            </>
        )
    }
}