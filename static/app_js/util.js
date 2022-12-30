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
      for(let todo of res_arr){
            if(todo){
                  let todo_arr = todo.split(",")
                  let td_html = ""
                  todo_arr.forEach((e, i) => {
                        let set = e.split(":")
                        if(set[0] === "id"){
                              td_html += "<td hidden>" +set[1] + "</td>"
                        }
                        if(set[0] !== "id" && set[0] !== "status" && set[0] !== "deleted"){
                              td_html += "<td>" +set[1] + "</td>"
                        }
                  });
                  tr_html += "<tr>" + td_html + "<td><button>削除</button></td>" + "</tr>"
            }
      }
      va.list_table.innerHTML = tr_html
}