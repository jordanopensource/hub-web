export default function ({
  store,
  redirect,
  params
}) {
  if (!store.getters.auth) {
    return redirect('/tasks')
  } else {
    var ownedTasks = []
    const tasks = store.getters.user.ownedTasks
    const taskId = params.id.toString()
    for (var key in tasks) {
      ownedTasks.push(tasks[key].id.toString());
    }
    if (!ownedTasks.includes(taskId)) {
      return redirect('/tasks')
    }
  }
}
