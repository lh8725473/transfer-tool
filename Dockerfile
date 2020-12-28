FROM base-image-node:10.17.0

# ADD nginx.conf /usr/local/nginx/conf/

ADD ./dist/ /usr/local/nginx/html/

EXPOSE 80

WORKDIR /usr/local/nginx

CMD ["sbin/nginx","-g","daemon off;"]