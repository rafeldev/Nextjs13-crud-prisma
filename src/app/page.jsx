import { prisma } from "@/libs/prisma";

//componentes
import TaskCard from "@/components/TaskCard";

async function loadTask() {
  // haciendo una peticion http/api/tasks
  /*  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();
  console.log(data); */

  // obteniendo de la base de datos
  return await prisma.task.findMany();
}

async function HomePage() {
  const tasks = await loadTask();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
