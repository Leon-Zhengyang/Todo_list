
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
                        create_list_html(res)
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
      console.log(objtr)
      let row_id = objtr.sectionRowIndex
      let id = objtr.querySelector("#todo-id-" + row_id).innerText
      console.log(id)
      const csrftoken = getCookie('csrftoken')
      let data = new FormData()
      data.append("task_pk", id)
      const request = new XMLHttpRequest()
      request.open("POST", "todo_delete/")
      request.setRequestHeader("X-CSRFToken", csrftoken)
      request.onreadystatechange = function(){
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                  let res = this.response
                  console.log(res)
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
                  create_list_html(res)
            }
      }
      request.send(data)
}

// todolist table描画
function create_list_html(res){
      let res_arr = res.split("//")
      let tr_html = ""
      for(let key in res_arr){
            if(res_arr[key]){
                  let todo_arr = res_arr[key].split(",")
                  let td_html = ""
                  todo_arr.forEach(e => {
                        let set = e.split(":")
                        if(set[0] === "id"){
                              td_html += "<td hidden id='todo-id-" + key + "'>" +set[1] + "</td>"
                        }else if(set[0] === "task"){
                              td_html += "<td><input id='todo-list-task-" + key + "' type='text' style='border:none' value=" + set[1] +" readonly></td>"
                        }else if(set[0] === "date_start"){
                              td_html += "<td><input id='todo-list-date_start-" + key + "' type='date' style='border:none' value=" +set[1] + " readonly></td>"
                        }else if(set[0] === "date_limit"){
                              td_html += "<td><input id='todo-list-date_limit-" + key + "' type='date' style='border:none' value=" +set[1] + " readonly></td>"
                        }else if(set[0] === "priority"){
                              let option_value1 = "value='1'"
                              let option_value2 = "value='2'"
                              let option_value3 = "value='3'"
                              if(set[1] === "高"){
                                    option_value1 += " selected"
                              }else if(set[1] === "中"){
                                    option_value2 += " selected"
                              }else{
                                    option_value3 += " selected"
                              }
                              td_html += "<td><select id='todo-list-priority' style='border:none' disabled><option " + option_value1 +">高</option><option " + option_value2 + ">中</option><option " + option_value3 + ">低</option></select></td>"
                        }else if(set[0] === "comment"){
                              td_html += "<td><input id='todo-list-comment-" + key + "' type='text' style='border:none' value=" +set[1] + " readonly></td>"
                              
                        }
                  });
                  let td_delete = "<td id='td-operate'><input type='button' id='edit-btn-" + key + "' value='編集' onclick='editRow(this)'> \
                  <input type='button' id='delete-btn-" + key + "' value='削除' onclick='deleteRow(this)'></td>"
                  tr_html += "<tr>" + td_html + td_delete + "</tr>"
            }
      }
      let list_table = document.querySelector("#list-table tbody")
      list_table.innerHTML = tr_html
}