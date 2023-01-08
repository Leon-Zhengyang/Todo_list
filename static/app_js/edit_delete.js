
// todolist 一覧編集ボタン
function editRow(obj){
      let objtr = obj.parentNode.parentNode
      let row_id = objtr.sectionRowIndex
      let todo_id = objtr.querySelector("#todo-id-" + row_id)
      let edit_btn = document.getElementById("edit-btn-" + row_id)
      let todo_list_task = objtr.querySelector("#todo-list-task-" + row_id)
      let todo_list_date_start = objtr.querySelector("#todo-list-date_start-" + row_id)
      let todo_list_date_limit = objtr.querySelector("#todo-list-date_limit-" + row_id)
      let todo_list_priority = objtr.querySelector("#todo-list-priority")
      let todo_list_comment = objtr.querySelector("#todo-list-comment-" + row_id)
      if(edit_btn.value == "編集"){
            todo_list_task.style.cssText = "border:1px solid #888;"
            todo_list_task.readOnly = false
            todo_list_date_start.style.cssText = "border:1px solid #888;"
            todo_list_date_start.readOnly = false
            todo_list_date_limit.style.cssText = "border:1px solid #888;"
            todo_list_date_limit.readOnly = false
            todo_list_priority.style.cssText = "border:1px solid #888;"
            todo_list_priority.disabled = false
            todo_list_comment.style.cssText = "border:1px solid #888;"
            todo_list_comment.readOnly = false
            todo_list_task.focus()
            edit_btn.value = "確定"
      }else{
            const csrftoken = getCookie('csrftoken')
            let data = new FormData()
            data.append("todo_id", todo_id.innerText)
            data.append("task", todo_list_task.value)
            data.append("priority", todo_list_priority.value)
            data.append("date_start", todo_list_date_start.value)
            data.append("date_end", todo_list_date_limit.value)
            data.append("comment", todo_list_comment.value)
            const request = new XMLHttpRequest()
            request.open("POST", "todo_edit/")
            request.setRequestHeader("X-CSRFToken", csrftoken)
            request.onreadystatechange = function(){
                  if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                        let res = this.response
                        let todo_json = JSON.parse(res)
                        create_todo_html(todo_json)
                  }
            }
            request.send(data)
            todo_list_task.style.cssText = "border:none;"
            todo_list_task.readOnly = true
            todo_list_date_start.style.cssText = "border:none;"
            todo_list_date_start.readOnly = true
            todo_list_date_limit.style.cssText = "border:none;"
            todo_list_date_limit.readOnly = true
            todo_list_priority.style.cssText = "border:none;"
            todo_list_priority.disabled = true
            todo_list_comment.style.cssText = "border:none;"
            todo_list_comment.readOnly = true
            edit_btn.value = "編集"
      }
}

// todolist 削除ボタン
function deleteRow(obj){
      let objtr = obj.parentNode.parentNode
      let row_id = objtr.sectionRowIndex
      let id = objtr.querySelector("#todo-id-" + row_id).innerText
      const csrftoken = getCookie('csrftoken')
      let data = new FormData()
      data.append("task_pk", id)
      const request = new XMLHttpRequest()
      request.open("POST", "todo_delete/")
      request.setRequestHeader("X-CSRFToken", csrftoken)
      request.onreadystatechange = function(){
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                  let res = this.response
                  get_all_todo()
            }
      }
      request.send(data)
}

function getCookie(name){
      let cookie_value = null
      if(document.cookie && document.cookie !== ''){
            let cookies = document.cookie.split(';')
            for(let i=0; i<cookies.length; i++){
                  let cookie = cookies[i].trim()
                  cookie_value = decodeURIComponent(cookie.substring(name.length + 1))
                  break
            }
      }
      return cookie_value
}

function get_all_todo(){
      const csrftoken = getCookie('csrftoken')
      let data = new FormData()
      data.append("task_search", "")
      const request = new XMLHttpRequest()
      request.open("POST", "init_list/")
      request.setRequestHeader("X-CSRFToken", csrftoken)
      request.onreadystatechange = function(){
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                  let res = this.response
                  let todo_json = JSON.parse(res)
                  create_todo_html(todo_json)
            }
      }
      request.send(data)
}

// todo list 一覧描画
function create_todo_html(todo_json){
      let tr_html = ""
      for(let key in todo_json){
            if(todo_json[key]){
                  let td_html = ""
                        td_html += "<td hidden id='todo-id-" + key + "'>" +todo_json[key]["pk"] + "</td>"
                        td_html += "<td><input id='todo-list-task-" + key + "' type='text' style='border:none' value=" + todo_json[key]["fields"]["task"] +" readonly></td>"
                        let date_start_new = todo_json[key]["fields"]["date_start"].split("T")[0]
                        let date_limit_new = todo_json[key]["fields"]["date_limit"].split("T")[0]
                        td_html += "<td><input id='todo-list-date_start-" + key + "' type='date' style='border:none' value=" + date_start_new + " readonly></td>"
                        td_html += "<td><input id='todo-list-date_limit-" + key + "' type='date' style='border:none' value=" + date_limit_new + " readonly></td>"
                        let option_value1 = "value='1'"
                        let option_value2 = "value='2'"
                        let option_value3 = "value='3'"
                        if(todo_json[key]["fields"]["priority"] == 1){
                              option_value1 += " selected"
                        }else if(todo_json[key]["fields"]["priority"] == 2){
                              option_value2 += " selected"
                        }else{
                              option_value3 += " selected"
                        }
                        td_html += "<td><select id='todo-list-priority' style='border:none' disabled><option " + option_value1 +">高</option><option " + option_value2 + ">中</option><option " + option_value3 + ">低</option></select></td>"
                        let com_fill = todo_json[key]["fields"]["comment"].length>0?todo_json[key]["fields"]["comment"]:'&nbsp;'
                        td_html += "<td><input id='todo-list-comment-" + key + "' type='text' style='border:none' value=" + com_fill + " readonly></td>"    

                  let td_delete = "<td id='td-operate'><input type='button' id='edit-btn-" + key + "' value='編集' onclick='editRow(this)'> \
                  <input type='button' id='delete-btn-" + key + "' value='削除' onclick='deleteRow(this)'></td>"
                  tr_html += "<tr>" + td_html + td_delete + "</tr>"
            }
      }
      let list_table = document.querySelector("#list-table tbody")
      list_table.innerHTML = tr_html
}