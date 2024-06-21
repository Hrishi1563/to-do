"use client";
import { useState, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Home() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await setTasks((prevState) => {
        return [
          ...prevState,
          {
            id: Date.now(), // Adding a unique id to each task
            title: titleRef.current.value,
            description: descriptionRef.current.value,
          },
        ];
      });
    } catch (err) {
      console.log(err.message);
    }
    titleRef.current.value = "";
    descriptionRef.current.value = "";

    setModal(false);
    localStorage.setItem("name", tasks);
  };
  const handleDelete = (taskID) => {
    setTasks((prevState) => {
      return prevState.filter((i) => i.id != taskID);
    });
    localStorage.setItem("name", tasks);
  };
  return (
    <div className="w-full h-full flex flex-row border items-center">
      {modal && (
        <div className="absolute flex flex-col border border-black bg-blue-800 rounded-3xl w-[50vh] h-[60vh] my-auto mx-[80vh]">
          <button
            className="self-start p-4 text-xl cursor-pointer hover:text-2xl"
            onClick={() => setModal(false)}
          >
            X{" "}
          </button>
          <form onSubmit={handleCreateTask} className="p-4 flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="title" className="font-bold text-white">
                Enter Task title
              </label>
              <input
                type="text"
                name="title"
                ref={titleRef}
                placeholder="Enter Title"
                className="mt-3 ml-2 border-2 rounded-xl p-2 hover:border-green-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-bold text-white ">
                Enter Task description
              </label>
              <input
                type="text"
                name="description"
                ref={descriptionRef}
                placeholder="Enter description"
                className="mt-3 ml-2 border-2 rounded-xl p-2 hover:border-green-400"
                required
              />
            </div>
            <button
              type="submit"
              className="self-start mx-8 my-4 border px-3 py-2 bg-green-400 rounded-2xl hover:bg-red-500"
            >
              Create
            </button>
          </form>
        </div>
      )}
      <main className="w-[100vh] h-[100vh] flex flex-col mx-auto">
        <div className="mx-auto mt-[20vh] w-[100vh] text-center px-28 py-5 bg-yellow-100 rounded-2xl">
          <h2 className="text-3xl bg-red-400 border rounded-full p-3 font-extrabold">
            To Do List
          </h2>
        </div>
        <p className="p-2 font-semibold">
          <button
            onClick={() => setModal(true)}
            className="hover:underline hover:text-blue-500"
          >
            + Create task
          </button>
        </p>
        <ul className="flex flex-col mt-2 px-14">
          {tasks.map((element) => (
            <div key={element.id} className="flex flex-row justify-between">
              <li>
                <h2 className="underline font-bold">
                  {"=>"}
                  {element.title}
                </h2>
                <p className="px-9 mt-2 overflow-clip">{element.description}</p>
              </li>
              <FaRegTrashAlt
                className="hover:text-red-500"
                onClick={() => {
                  handleDelete(element.id);
                }}
              />
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
