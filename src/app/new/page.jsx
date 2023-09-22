"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //aca se hace la peticion a la api para obtener los valores por el id
  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 p-10 lg:w-2/4 md:w-full"
        onSubmit={onSubmit}
      >
        <label className="font-bold text-sm" htmlFor="title">
          Titulo de la tarea
        </label>
        <input
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          type="text"
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label className="font-bold text-sm" htmlFor="description">
          Descripcion de la tarea
        </label>

        <textarea
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
          id="description"
          cols="30"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Crear
          </button>

          {params.id && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
              type="button"
              onClick={() => {
                fetch(`/api/tasks/${params.id}`, {
                  method: "DELETE",
                });
                router.refresh();
                router.push("/");
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewPage;
