import * as va from './var.js'

// get cookie for Ajax
export function getCookie(name){
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

// todolist table描画
export function create_list_html(res){
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
                              let com_fill = set[1].length>0?set[1]:'&nbsp;'
                              td_html += "<td><input id='todo-list-comment-" + key + "' type='text' style='border:none' value=" + com_fill + " readonly></td>"
                              
                        }
                  });
                  let td_delete = "<td id='td-operate'><input type='button' id='edit-btn-" + key + "' value='編集' onclick='editRow(this)'> \
                  <input type='button' id='delete-btn-" + key + "' value='削除' onclick='deleteRow(this)'></td>"
                  tr_html += "<tr>" + td_html + td_delete + "</tr>"
            }
      }
      va.list_table.innerHTML = tr_html
}

export function get_all_todo(){
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

export function regist_todo(){
      const csrftoken = getCookie('csrftoken')
      let data = new FormData()
      data.append("task", va.task_regist.value)
      data.append("priority", va.priority_regist.value)
      data.append("date_start", va.date_start_regist.value)
      data.append("date_end", va.date_end_regist.value)
      data.append("comment", va.comment_regist.value)
      const request = new XMLHttpRequest()
      request.open("POST", "todo_regist/")
      request.setRequestHeader("X-CSRFToken", csrftoken)
      request.onreadystatechange = function(){
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                  let res = this.response
                  create_list_html(res)
                  // todo_render_delete()
            }
      }
      request.send(data)
}

// 要らないかもしれません
export function todo_render_delete(){
      document.querySelectorAll("#list-table tbody tr").forEach((e, k) =>{
            let delete_btn = e.querySelector("#delete-btn")
            let edit_btn = e.querySelector("#edit-btn")
            let id = e.querySelector("#todo-id-" + k).innerText
            let todo_list_task = e.querySelector("#todo-list-task-" + k)
            let todo_list_date_start = e.querySelector("#todo-list-date_start")
            let todo_list_date_limit = e.querySelector("#todo-list-date_limit")
            let todo_list_priority = e.querySelector("#todo-list-priority")
            let todo_list_comment = e.querySelector("#todo-list-comment")
            let td_operate = e.querySelector("#td-operate")
            // 削除ボタンを押下する時
            delete_btn.addEventListener("click", function(){
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
            })
            // 編集ボタンを押下する時
            // console.log(edit_btn)
            // let task_old = todo_list_task.innerHTML
            // let date_start_old = todo_list_date_start.innerHTML
            // let date_limit_old = todo_list_date_limit.innerHTML
            // let priority_old = todo_list_priority.innerHTML
            // let comment_old = todo_list_comment.innerHTML
            // let td_operate_old = td_operate.innerHTML
            // edit_btn.addEventListener("click", function(){
            //       if(e.querySelector("#edit-btn").innerText === "確定"){
            //             console.log(task_old)
            //             todo_list_task.innerHTML = task_old
            //             todo_list_date_start.innerHTML = date_start_old
            //             todo_list_date_limit.innerHTML = date_limit_old
            //             todo_list_priority.innerHTML = priority_old
            //             todo_list_comment.innerHTML = comment_old
            //             td_operate.innerHTML = td_operate_old
            //             e.querySelector("#edit-btn").innerText = "編集"
            //       }
            //       else if(e.querySelector("#edit-btn").innerText === "編集"){
            //             console.log("b")
            //             todo_list_task.innerHTML = "<td id='todo-list-task'>" +"<input type='text' value ="+ todo_list_task.innerText + "></td>"
            //             todo_list_date_start.innerHTML = "<td id='todo-list-date_start'>" +"<input type='text' value ="+ todo_list_date_start.innerText + "></td>"
            //             todo_list_date_limit.innerHTML = "<td id='todo-list-date_limit'>" +"<input type='text' value ="+ todo_list_date_limit.innerText + "></td>"
            //             let option_value1 = "value='1'"
            //             let option_value2 = "value='2'"
            //             let option_value3 = "value='3'"
            //             if(todo_list_priority.innerText === "高"){
            //                   option_value1 += " selected"
            //             }else if(todo_list_priority.innerText === "中"){
            //                   option_value2 += " selected"
            //             }else{
            //                   option_value3 += " selected"
            //             }
            //             todo_list_priority.innerHTML = "<td><select id='todo-list-priority'><option " + option_value1 +">高</option><option " + option_value2 + ">中</option><option " + option_value3 + ">低</option></select></td>"
            //             todo_list_comment.innerHTML = "<td id='todo_list_comment'>" +"<input type='text' value ="+ todo_list_comment.innerText + "></td>"
            //             e.querySelector("#edit-btn").innerText = "確定"
            //       }
            //       // edit_btn.addEventListener("click", function(){
            //       //       todo_list_task.innerHTML = task_old
            //       //       todo_list_date_start.innerHTML = date_start_old
            //       //       todo_list_date_limit.innerHTML = date_limit_old
            //       //       todo_list_priority.innerHTML = priority_old
            //       //       todo_list_comment.innerHTML = comment_old
            //       //       td_operate.innerHTML = td_operate_old
            //       // })
            //       // confirm_btn.addEventListener("click", function(){

            //       // })
            // })
            
      })
}