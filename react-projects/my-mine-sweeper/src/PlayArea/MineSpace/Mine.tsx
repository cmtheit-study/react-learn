import React from "react";

// 地雷组件命名空间
export namespace Mine {
    export interface State {
        name: "plain" | "checked" | "boom" | "flagged",
        img: string | string[]
    }

    /** todo: 这里的数据如何避免写到 ts。我觉得放到静态资源中挺好
     * 地雷的所有可用状态
     */
    export const states: State[] = [{
        name: "plain",
        img: "data:img/gif;base64,R0lGODlhGQAZAJEAAP///8DAwICAgAAAACH5BAQUAP8ALAAAAAAZABkAAAJKhI+pFrH/GpwnCFGb3nxfzHQi92XjWYbnmAIrepkvGauzV7s3Deq71vrhekJgrtgIIpVFptD5g+6kN+osZflot9xPsgvufsPkSwEAOw",
    }, {
        name: "flagged",
        img: "data:img/gif;base64,R0lGODlhGQAZAKIAAP///8DAwICAgP8AAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAZABkAAANsCLrcriG8OSO9KwiRo//gt3FQaIJjZw7DmZYh25ovEMtzWH+47G6qno8GhAWEOVTRBur9SMxbUrQ8BQiEpyqE1RpBXSLUGtZVI9i0Wu3ZodfwbMR9ja/bZ6s3qjeTNCOBgoMjc4SHhIaIixsJADs="
    }, {
        name: "checked",
        img: [
            "data:img/gif;base64,R0lGODlhGQAZAKIAAM7OzsbGxr6+vra2trKysqampoKCggAAACH5BAAHAP8ALAAAAAAZABkAAANHaLrc3mWQSau9xAwQuv9gGBhEIJxoqq4CabLw6sY0Otf0jcP6Lpc+HjD4exFTvWNrqDwlj09iNDj1VXdXXLa2zTGb3VgYlgAAOw==", // 周围没有炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgAAA/wAAACH5BAQUAP8ALAAAAAAZABkAAAJMjI+py70Ao5wUmorxzTxuLIRC9lFiSAbZOWqqybZVCcWoC8fpeu5gj/uJfBUWMXebvYpAJdJGoQFsTc8yQh1OpJ3otesEH8XbLzlSAAA7",             // 周围有一个炸弹
            "data:img/gif;base64,R0lGODlhGQAZALMAAMDAwKu5q6i4qKW3pZy0nJaylpCwkIquioCAgACAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAZABkAAAReEMlJq704X8C7/yAnhSQ5lmh3cknrvi64wvT7zXV9I50N+ipeihXzrFACoEhYMtB2pSSsIGN6CrRBIHQEEGjb0pEmGOJch+Gyl3samW13kB0vztViKx665+r7a4AfEQA7", // 2 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgP8AAAAAACH5BAQUAP8ALAAAAAAZABkAAAJOjI+py70Ao5wUmorxzTxuIITiOFIfiZbSmabT16le0EWyRdeg+OZTGzL5JECBsFI86m4AGIfpzEB9RVLPVuWtqFnjVZeJgmdjzbBMRk8KADs=",         // 3 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgAAAmQAAgCH5BAAHAP8ALAAAAAAZABkAAAJdjI+py70Ao5wUmorxzTzuOgjAQJLUN5FiaU5oVK7sGVAxxA50Gor47KrBVJLc7hfilY6jnHMp+TynwYjgisXmfB4hx1jtgKPezLjbaULJ6bOlnK684mG6HG5H5ykFADs=", // 4 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgIAAAAAAACH5BAQUAP8ALAAAAAAZABkAAAJOjI+py70Ao5wUmorxzTxuIITiSE4fiY5mEKXu2oodDKmzx9bybeWgW6L9gDZcjLgz3oo9HhPw6TxPyGRTVxUIs1ohjxL9SsLia3nsO0MKADs=",   // 5 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAMDAwICAgACAgAAAACH5BAQUAP8ALAAAAAAZABkAAAJTjI+py70Ao5wUmorxzTxuKITiKFIfiZbTmaJmEI3dCoPqbNWAjOdxS3r9gDyPjhiUsEKVos/GpDgBS0Hz9twhsdTjNmqUfIU9ja5MQ1c+6nBbUgAAOw==", // 6 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAJEAAL6+voKCggAAAAAAACH5BAAHAP8ALAAAAAAZABkAAAJMjI+py70Ao5wUmorxzTxuIITiSE4fiY5mEKXu2rUiHIOz9HElznY771NRcpQfrWI8TpJK2S1DtD2hPWeoRhTGojVgV1P9NsWWMBlSAAA7", // 7 炸弹
            "data:img/gif;base64,R0lGODlhGQAZAIAAAMDAwICAgCH5BAQUAP8ALAAAAAAZABkAAAJKjI+py70Ao5wUmorxzTxu63xeMIYi8JnHlK4UwpLgOctjaUuwnqtvb/rxQsJaZXcz/k4tGsqVfPp4OCK1yih2OM7t1avJgWNjTAEAOw==", // 8 炸弹
        ]
    }, {
        name: "boom",
        img: [
            "data:img/gif;base64,R0lGODlhGQAZAJEAAP///76+voKCggAAACH5BAAHAP8ALAAAAAAZABkAAAJglI+py70Bo5wUmhrHwPFyzVlCCIYeBGqqik5nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OBSQ4yv6/aQAADs=",
            "data:img/gif;base64,R0lGODlhGQAZAJEAAP///4CAgP8AAAAAACH5BAQUAP8ALAAAAAAZABkAAAJgjI+py70Co5wUmhrHwPFyzVlBCIYeBGqqik6nkK4s7I6TjFOvCvR42bGhND3AbyPZEX2/GuwILV2iUZGEOgtesUhthuu8VcNbqE74fOZoSTQFiHm9u3G3OCSQ4yv6/aQAADs="
        ]
    }]

    export function getState(name: State["name"]): State {
        return states.find(s => s.name == name)
    }

    export interface PropData {
        isMainBoom: boolean,  // 是否是被手动触发的地雷，当手动触发一个地雷，其他地雷都自动触发
        state: State,
        aroundMineNum: number
    }

    export interface PropAction {
        onCheck(): void;    // 点击触发
        onFlag(): void;     // 插旗
    }

    export type Prop = PropData & PropAction;

    export function Component({isMainBoom, state, aroundMineNum, onCheck, onFlag}: Prop) {
        let appearance: string;
        const theState = getState(state.name)
        switch (state.name) {
            case "plain":
            case "flagged":
                appearance = theState.img as string
                break;
            case "checked":
                appearance = theState.img[aroundMineNum]
                break;
            case "boom":
                appearance = isMainBoom ? theState.img[1] : theState.img[0]
                break;
        }

        function handleContextMenu(e) {
            e.preventDefault();
            onFlag();
        }

        return (
            <>
                <button onClick={onCheck} onContextMenu={handleContextMenu}>
                    <img src={appearance} alt={"扫雷块"}/>
                </button>
            </>
        )
    }
}




