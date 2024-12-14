# Gunakan Nginx sebagai web server
FROM nginx:latest

# Hapus konfigurasi default Nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin file HTML, CSS, dan JavaScript ke direktori Nginx
COPY . /usr/share/nginx/html

# Expose port untuk Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
