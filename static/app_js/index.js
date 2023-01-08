import * as va from './var.js'
import * as util from './util.js'
window.addEventListener('DOMContentLoaded', () => {
      util.get_all_todo()
      va.regist_btn.addEventListener("click", function(){
            util.regist_todo()
      })

      // reset button(regist)
      va.reset_regist_btn.addEventListener("click", function(){
            va.task_regist.value = ""
            va.priority_regist.value = 1
            va.date_start_regist.value = ""
            va.date_end_regist.value = ""
            va.comment_regist.value = ""
      })

      // reset button(search)
      va.reset_search_btn.addEventListener("click", function(){
            va.task_search.value = ""
            va.priority_search.value = ""
            va.date_start_search.value = ""
            va.date_end_search.value = ""
            va.comment_search.value = ""
      })

      va.task_regist.addEventListener("keyup", function(){
            if(va.task_regist.value.length > 0){
                  va.regist_btn.style.backgroundColor = "#006FD5"
                  va.regist_btn.disabled = false
            }else{
                  va.regist_btn.style.backgroundColor = "#c7c7c7"
                  va.regist_btn.disabled = true
            }
      })
      

      // search button
      va.search_btn.addEventListener("click", function(){
            const csrftoken = util.getCookie('csrftoken')
            let data = new FormData()
            data.append("task_search", va.task_search.value)
            data.append("priority_search", va.priority_search.value)
            data.append("date_start_search", va.date_start_search.value)
            data.append("date_end_search", va.date_end_search.value)
            data.append("comment_search", va.comment_search.value)
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
