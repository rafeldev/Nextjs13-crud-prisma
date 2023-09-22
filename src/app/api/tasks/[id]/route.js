import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req, { params }) {
  //obteniendo de prisma por id
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(task);
}

//actuializando tarea
export async function PUT(req, { params }) {
  const data = await req.json();
  const taskUpdate = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    //se pasa de esta forma ( data: data ) para que el usuario actualice el dato que quiera,
    //osea que puede actualizar o el title o la descripcion o ambos
    data: data,
  });
  return NextResponse.json(taskUpdate);
}

//eliminando tarea
export async function DELETE(req, { params }) {
  try {
    const taskRemove = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(taskRemove);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
