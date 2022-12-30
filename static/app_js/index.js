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
                        util.create_list_html(res)
                  }
            }
            request.send(data)
      })
      let list_table1 = document.querySelectorAll("#list-table tbody tr")
      // console.log(list_table1)
      for(let v of list_table1){
            console.log(v.innerHTML)
      }
      // console.log(list_table.getElementsByClassName(""))
      // for(let v of list_table.innerHTML){
            
      // }

      // reset button
      va.reset_btn.addEventListener("click", function(){
            va.task_regist.value = ""
            va.priority_regist.value = 1
            va.date_start_regist.value = ""
            va.date_end_regist.value = ""
            va.comment_regist.value = ""
      })

      // search button
      va.search_btn.addEventListener("click", function(){
            const csrftoken = util.getCookie('csrftoken')
            let data = new FormData()
            data.append("task_search", va.task_search.value)
            const request = new XMLHttpRequest()
            request.open("POST", "todo_search/")
            request.setRequestHeader("X-CSRFToken", csrftoken)
            request.onreadystatechange = function(){
                  if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                        let res = this.response
                        util.create_list_html(res)
                  }
            }
            request.send(data)
      })
})