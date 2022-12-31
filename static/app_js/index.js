import * as va from './var.js'
import * as util from './util.js'
window.addEventListener('DOMContentLoaded', () => {
      util.get_all_todo()
      va.regist_btn.addEventListener("click", function(){
            util.get_all_todo()
      })
      let list_table1 = document.querySelectorAll("#list-table tbody tr")
      for(let v of list_table1){
            console.log(v.innerHTML)
      }

      // reset button
      va.reset_regist_btn.addEventListener("click", function(){
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
      document.querySelectorAll("#list-table tbody tr").forEach(e =>{
            console.log(e)
      })
})
