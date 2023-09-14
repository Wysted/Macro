import React, { useEffect, useState, useContext } from "react";
import { ContextData } from "../context/ContextData";
import { ipcRenderer } from "electron";

export default function ContainerSetup() {
    const { data, setData } = useContext(ContextData);

    const handleSave = () => {
        ipcRenderer.send("crear-archivo", {
            nombreArchivo: "record5.txt",
            contenido: data,
        });
        setData([]);
    };
    const handleReset = () => {
        setData([]);
    };
    const handleDelete = (indice) => {
        const newData = [...data];
        newData.splice(indice, 1);
        setData(newData);
    };
    return (
        <>
            <div className="box-border flex h-52 w-5/6 border bg-white px-4 rounded-xl overflow-auto">
                <ul className="w-full">
                    {data
                        ? data.map((elemento, indice) => {
                              if (
                                  elemento.type === "text" ||
                                  elemento.type === "delay"
                              ) {
                                  return (
                                      <div
                                          key={indice}
                                          className="flex w-full justify-center items-center"
                                      >
                                          <li className="flex justify-between items-center w-full pt-1 cursor-pointer text-black border-b border-transparent duration-500 hover:border-blue-500">
                                              {elemento.delay
                                                  ? elemento.delay
                                                  : ""}
                                              {elemento.text
                                                  ? elemento.text
                                                  : ""}
                                          </li>
                                          <span
                                              onClick={() =>
                                                  handleDelete(indice)
                                              }
                                              className="flex justify-center items-center cursor-pointer  w-5 h-5 rounded-sm border border-transparent hover:border duration-500 hover:border-red-400"
                                          >
                                              x
                                          </span>
                                      </div>
                                  );
                              } else if (elemento.x && elemento.y) {
                                  return (
                                      <div
                                          key={indice}
                                          className="flex w-full justify-center items-center"
                                      >
                                          <li className="w-full pt-1 text-black cursor-pointer border-b border-transparent duration-500 hover:border-blue-500">
                                              x : {elemento.x}, y: {elemento.y}
                                          </li>
                                          <span
                                              onClick={() =>
                                                  handleDelete(indice)
                                              }
                                              className="flex justify-center items-center cursor-pointer  w-5 h-5 rounded-sm border border-transparent hover:border duration-500 hover:border-red-400"
                                          >
                                              x
                                          </span>
                                      </div>
                                  );
                              }
                          })
                        : ""}
                </ul>
            </div>
            <div className="flex w-4/5 gap-1">
                <button
                    type="button"
                    onClick={handleSave}
                    className=" box-border w-4/5 p-1 mt-2 text-xl text-white bg-gray-900 h-full border border-transparent rounded-2xl  duration-500 hover:border-blue-500"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className=" box-border w-1/5 p-1 mt-2 text-xl text-white bg-gray-900 h-full border border-transparent rounded-2xl  duration-500 hover:border-blue-500"
                >
                    💩
                </button>
            </div>
        </>
    );
}
