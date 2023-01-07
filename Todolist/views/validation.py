import re

class validate:
      @classmethod
      def check_date_format(cls, date):
            pattern = r'[12]\d{3}\-(0?[1-9]|1[0-2])\-(0?[1-9]|[12][0-9]|3[01])$'
            prog = re.compile(pattern)
            result = prog.match(date)
            return True if result else False
      @classmethod
      def check_task_blank(cls, task):
            return True if task.strip() else False