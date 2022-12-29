import * as va from './var.js'
import * as util from './util.js'
window.addEventListener('DOMContentLoaded', () => {
      va.regist_btn.addEventListener("click", function(){
            const csrftoken = util.getCookie('csrftoken')
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
                        console.log(res)
                        // let res_arr = res.split("}{")
                        // let tr_html = ""
                        // for(let todo of res_arr){
                        //       let todo_arr = todo.split(",")
                        //       let td_html = ""
                        //       todo_arr.forEach((e, i) => {
                        //             let v = e.split(":")
                        //             console.log(e)
                        //             td_html = "<td>" + v + "</td>"   
                        //       });
                        //       tr_html += "<tr>" + td_html + "</tr>"
                        // }
                        // console.log(tr_html)
                
                        // for(let todo of res_json["todo_json"]){
                        //       console.log(todo)
                        // }
                  }
            }
            request.send(data)
      })

})