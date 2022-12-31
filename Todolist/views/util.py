def return_todo(todo_all_obj):
      todo_arr = []
      for todo in todo_all_obj:
            todo_str = ""
            todo_str += "id:" + str(todo.id) + ","
            todo_str += "task:" + todo.task + ","
            todo_str += "date_start:" + todo.date_start.strftime('%Y-%m-%d') + ","
            todo_str += "date_limit:" + todo.date_limit.strftime('%Y-%m-%d') + ","
            todo_str += "priority:" + todo.priority.label + ","
            todo_str += "comment:" + todo.comment + ","
            todo_str += "status:" + str(todo.status) + ","
            todo_str += "deleted:" + str(todo.deleted)
            todo_arr.append(todo_str + "//")
      return todo_arr