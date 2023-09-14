/*
    Añadir proceso
    1.click :check:
    2.imagen 
    3.delay 
    4.texto :check:

*/
import { ipcRenderer } from "electron";
import React, { useEffect, useState, useContext } from "react";
import { ContextData } from "../context/ContextData";
export default function Buttons() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const { setData } = useContext(ContextData);
    const handleStart = () => {
        ipcRenderer.send("start");
    };
    const handleClick = async () => {
        ipcRenderer.send("mouse-click");
        ipcRenderer.on("mouse-position", (event, e) => {
            setMouse({
                x: e.x,
                y: e.y,
            });
        });
    };
    const handleSubmitText = (e) => {
        e.preventDefault();
        const info = {
            type: "text",
            text: e.target[0].value,
        };
        setData((prevData) => [...prevData, info]);
    };
    const handleSubmitDelay = (e) => {
        e.preventDefault();
        const info = {
            type: "delay",
            delay: e.target[0].value,
        };
        console.log(info);
        setData((prevData) => [...prevData, info]);
    };
    useEffect(() => {
        if (mouse.x !== 0 || mouse.y !== 0) {
            setData((prevData) => [...prevData, mouse]);
        }
    }, [mouse]);
    return (
        <div className="flex justify-evenly items-center w-full h-full flex-wrap gap-5 mb-4">
            <div className="flex w-full h-full justify-evenly items-center flex-wrap">
                <button
                    onClick={handleStart}
                    className=" box-border w-1/4 text-xl text-white bg-gray-900 h-1/2 border border-transparent rounded-2xl  duration-500 hover:border-blue-500"
                >
                    Start
                </button>
                <button
                    onClick={handleClick}
                    className=" box-border w-1/4 text-xl text-white bg-gray-900 h-1/2 border border-transparent rounded-2xl duration-500 hover:border-blue-500"
                >
                    🖱️
                </button>
                <div className="flex h-1/5 items-center justify-center ">
                    <label className=" h-1/5 flex flex-col items-center p-4 text-white bg-gray-900 rounded-lg shadow-lg tracking-wide uppercase cursor-pointer border border-transparent duration-500 hover:border-blue-500">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <input type="file" className="hidden" />
                    </label>
                </div>
            </div>

            <form
                onSubmit={handleSubmitText}
                className="box-border  flex justify-center items-center h-3/6 w-full gap-4"
            >
                <input
                    type="text"
                    className="box-border w-1/2 h-full rounded-xl p-2"
                    placeholder="Texto"
                />
                <button
                    type="submit"
                    className=" box-border w-1/4 text-xl text-white bg-gray-900 h-full border border-transparent rounded-2xl  duration-500 hover:border-blue-500"
                >
                    Ingresar
                </button>
            </form>
            <form
                onSubmit={handleSubmitDelay}
                className="box-border  flex justify-center items-center  h-3/6 w-full gap-4"
            >
                <input
                    type="number"
                    className="box-border w-1/2 h-full rounded-xl p-2"
                    min={1}
                    placeholder="Delay"
                />
                <button
                    type="submit"
                    className=" box-border w-1/4 text-xl text-white bg-gray-900 h-full border border-transparent rounded-2xl  duration-500 hover:border-blue-500"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}
