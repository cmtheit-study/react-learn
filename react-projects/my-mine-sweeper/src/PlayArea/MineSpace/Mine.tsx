import React, {useMemo} from "react";
import {PlayArea} from "../../PlayArea";
import {App} from "../../App";
import {flushSync} from "react-dom";

// 地雷组件
export namespace Mine {
    // 地雷类型
    export enum Type {
        boom,
        nBoom,
    }

    export type MineBaseState = 'unchecked' | 'flagged'

    interface BaseData<S extends string> {
        type: Type
        state: MineBaseState | S
    }

    export interface BoomData extends BaseData<'boomed'> {
        type: Type.boom,
        isMainBoom?: boolean
    }

    export interface NBoomData extends BaseData<'checked'>{
        type: Type.nBoom,
        surround?: number
    }

    /** todo: 这里的数据如何避免写到 ts。我觉得放到静态资源中挺好
     * 地雷的所有可用状态
     */
    const appearances: {
        [key in BoomData['state'] | NBoomData['state']]: string[]
    } = {
        unchecked: [
            "data:img/gif;base64,R0lGODlhGQAZAJEAAP///8DAwICAgAAAACH5BAQUAP8ALAAAAAAZABkAAAJKhI+pFrH/GpwnCFGb3nxfzHQi92XjWYbnmAIrepkvGauzV7s3Deq71vrhekJgrtgIIpVFptD5g+6kN+osZflot9xPsgvufsPkSwEAOw"
        ],
        flagged: [
            "data:img/gif;base64,R0lGODlhGQAZAKIAAP///8DAwICAgP8AAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAZABkAAANsCLrcriG8OSO9KwiRo//gt3FQaIJjZw7DmZYh25ovEMtzWH+47G6qno8GhAWEOVTRBur9SMxbUrQ8BQiEpyqE1RpBXSLUGtZVI9i0Wu3ZodfwbMR9ja/bZ6s3qjeTNCOBgoMjc4SHhIaIixsJADs="
        ],
        checked: [
            "data:img/gif;base64,R0lGODlhGQAZAKIAAM7OzsbGxr6+vra2trKysqampoKCggAAACH5BAAHAP8ALAAAAAAZABkAAANHaLrc3mWQSau9xAwQuv9gGBhEIJxoqq4CabLw6sY0Otf0jcP6Lpc+HjD4exFTvWNrqDwlj09iNDj1VXdXXLa2zTGb3VgYlgAAOw==", // 周围没有炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgAAA/wAAACH5BAQUAP8ALAAAAAAZABkAAAJMjI+py70Ao5wUmorxzTxuLIRC9lFiSAbZOWqqybZVCcWoC8fpeu5gj/uJfBUWMXebvYpAJdJGoQFsTc8yQh1OpJ3otesEH8XbLzlSAAA7",             // 周围有一个炸弹
            "data:img/gif;base64,R0lGODlhGQAZALMAAMDAwKu5q6i4qKW3pZy0nJaylpCwkIquioCAgACAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAZABkAAAReEMlJq704X8C7/yAnhSQ5lmh3cknrvi64wvT7zXV9I50N+ipeihXzrFACoEhYMtB2pSSsIGN6CrRBIHQEEGjb0pEmGOJch+Gyl3samW13kB0vztViKx665+r7a4AfEQA7", // 2 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgP8AAAAAACH5BAQUAP8ALAAAAAAZABkAAAJOjI+py70Ao5wUmorxzTxuIITiOFIfiZbSmabT16le0EWyRdeg+OZTGzL5JECBsFI86m4AGIfpzEB9RVLPVuWtqFnjVZeJgmdjzbBMRk8KADs=",         // 3 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgAAAmQAAgCH5BAAHAP8ALAAAAAAZABkAAAJdjI+py70Ao5wUmorxzTzuOgjAQJLUN5FiaU5oVK7sGVAxxA50Gor47KrBVJLc7hfilY6jnHMp+TynwYjgisXmfB4hx1jtgKPezLjbaULJ6bOlnK684mG6HG5H5ykFADs=", // 4 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgIAAAAAAACH5BAQUAP8ALAAAAAAZABkAAAJOjI+py70Ao5wUmorxzTxuIITiSE4fiY5mEKXu2oodDKmzx9bybeWgW6L9gDZcjLgz3oo9HhPw6TxPyGRTVxUIs1ohjxL9SsLia3nsO0MKADs=",   // 5 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgACAgAAAACH5BAQUAP8ALAAAAAAZABkAAAJTjI+py70Ao5wUmorxzTxuKITiKFIfiZbTmaJmEI3dCoPqbNWAjOdxS3r9gDyPjhiUsEKVos/GpDgBS0Hz9twhsdTjNmqUfIU9ja5MQ1c+6nBbUgAAOw==", // 6 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAL6+voKCggAAAAAAACH5BAAHAP8ALAAAAAAZABkAAAJMjI+py70Ao5wUmorxzTxuIITiSE4fiY5mEKXu2rUiHIOz9HElznY771NRcpQfrWI8TpJK2S1DtD2hPWeoRhTGojVgV1P9NsWWMBlSAAA7", // 7 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAIAAAMDAwICAgCH5BAQUAP8ALAAAAAAZABkAAAJKjI+py70Ao5wUmorxzTxu63xeMIYi8JnHlK4UwpLgOctjaUuwnqtvb/rxQsJaZXcz/k4tGsqVfPp4OCK1yih2OM7t1avJgWNjTAEAOw==", // 8 炸弹
        ],
        boomed: [
            "data:img/gif;base64,R0lGODlhGQAZAJEAAP///4CAgP8AAAAAACH5BAQUAP8ALAAAAAAZABkAAAJgjI+py70Co5wUmhrHwPFyzVlBCIYeBGqqik6nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OCSQ4yv6/aQAADs=",
            "data:img/gif;base64,R0lGODlhGQAZAJEAAP///76+voKCggAAACH5BAAHAP8ALAAAAAAZABkAAAJglI+py70Bo5wUmhrHwPFyzVlCCIYeBGqqik5nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OBSQ4yv6/aQAADs="
        ],
    }

    export function getAppearance(data: Data): string {
        switch (data.state) {
            case 'unchecked':
            case 'flagged':
                return appearances[data.state][0]
            case 'checked':
                return appearances.checked[data.surround]
            case 'boomed':
                return appearances.boomed[data.isMainBoom ? 0 : 1]
        }
    }

    export namespace Prop {
        interface Data {
            i: number,
            j: number,
        }
        interface Action {
        }
        export type T = Data & Action;
    }

    export type Data = BoomData | NBoomData;

    export function Cpn({i, j}: Prop.T) {
        const [mineMatrix, updateMineMatrix] = PlayArea.Ctx.useMineMatrix();
        const [gameObj, dispatchGameObj] = App.Game.Ctx.useGameObj();
        const data = mineMatrix.getData(i, j);
        const appearance: string = getAppearance(data);

        const gameOver = gameObj.isEnd();

        function handleContextMenu(e: React.MouseEvent) {
            e.preventDefault()
            updateMineMatrix(m => {
                try {
                    m.flag(i, j)
                } catch (e) {}
            })
        }

        function handleCheck(_: React.MouseEvent) {
            updateMineMatrix(m => {
                m.check(i, j, true);
                if (data.type === Type.boom) {
                    dispatchGameObj({
                        type: "gameOver",
                        res: App.Game.Result.lose
                    })
                }
            })
        }

        return (
            <>
                {gameOver ?
                    <button>
                        <img src={appearance} alt={"扫雷块"}/>
                    </button> :
                    <button onClick={handleCheck} onContextMenu={handleContextMenu}>
                        <img src={appearance} alt={"扫雷块"}/>
                    </button>}

            </>
        )
    }
}




