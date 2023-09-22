import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req) {
  const { title, description } = await req.json();

  //creando en prisma
  const newTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
    },
  });
  return NextResponse.json(newTask);
}
