FROM nginx:latest
 
# デフォルトのconfを消して、別の設定を追加
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d