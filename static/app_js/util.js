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
                  let todo_json = JSON.parse(res)
                  create_html(todo_json)
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
                  if(res.split("error:").length > 1){
                        va.error_msg.innerText = res.split("error:")[1]
                  }
                  else{
                        let todo_json = JSON.parse(res)
                        create_html(todo_json)
                  }    
            }
      }
      request.send(data)
}

// todo list 一覧描画
export function create_html(todo_json){
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
      va.list_table.innerHTML = tr_html
}
