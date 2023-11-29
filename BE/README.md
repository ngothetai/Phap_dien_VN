# Phap_dien_VN

<table style="margin: left">
  <tr>
    <td>Python</td>
    <td>3.9</td>
  </tr>
  <tr>
    <td>Django</td>
    <td>4.2.7</td>
  </tr>
  <tr>
    <td>OS</td>
    <td>Ubuntu22.04</td>
  </tr>
</table>


# RUN

## SETUP
```bash
mamba create -n be python=3.9
mamba activate be
mamba install -c conda-forge django -y
```

## RUN PROJECT

```bash
python manager.py makemigrations
python manager.py migrate
python manager.py createsuperuser
```

## INSERT DATABASE

- place 4 path database and jsonfile below

- run file main.py in static/test/ to insert database

```python
database = DatabaseConnection("<path_database>",
                              "<path_topic_json>",
                              "<path_heading_json>",
                              "<path_alltree_json>")

database.insert_topic("app_topic", database.topic_json)
database.insert_heading("app_heading", database.heading_json)
database.insert_article("app_article", database.alltree_json)
```


```bash
python main.py
```


![Alt text](static/demo/image1.png)

![Alt text](static/demo/image2.png)



## ADMIN SITE

```bash
python manager.py runserver
```

![Alt text](static/demo/image.png)

![Alt text](static/demo/image-1.png)

![Alt text](static/demo/image-2.png)


# THIẾT KẾ CƠ SỞ DỮ LIỆU

![img.png](static/demo/img.png)

models Chủ đề
  - id chủ đề
  - name chủ dề

models Đề mục
  - id đề mục
  - name đề mục
  - id chủ đề
  - rank số thứ tự đề mục
  > xem danh mục văn bản
  > xem chi tiết

models chỉ mục
  - id chỉ mục
  - name chỉ mục
  - id đề mục
  - id chỉ mục(chỉ mục con)


class 

- Topics (Chủ đề pháp điển)
- Sub_topic (Đề mục pháp điển)      


# API

--------------------
Endpoint: 

  link: http://127.0.0.1:8000/api/

--------------------
Lấy tất cả các chủ đề

  method: **GET**

  link: http://127.0.0.1:8000/api/topic/

--------------------
Lấy tất cả các đề mục theo chủ đề

  method: **GET**

  link: http://127.0.0.1:8000/api/heading/

```python
params = {
  'id_topic' : 'id topic được lấy từ api chủ đề'
}
```

--------------------
Lấy tất cả các Chương thuộc đề mục

  method: **GET**

  link: http://127.0.0.1:8000/api/article/

```python
params = {
  'id_heading' : 'id của đề mục, cái này được lấy từ api đề mục',
  'id_parent'  : 'null' <-- cái này để mặc định giá trị là null ko thay đổi
}
```

--------------------
Lấy tất cả các điều trong Chương

  method: **GET**

  link: http://127.0.0.1:8000/api/article/

```python
params = {
  'id_heading' : 'id của đề mục, cái này lấy của api đề mục',
  'id_parent'  : 'id của chương, cái này lấy của api chương'
}
```

--------------------
API tìm kiếm thông tin

  method: **POST**

  link: http://127.0.0.1:8000/api/search/

```python
data = {
  "content": "Nội dung"
}
```
--------------------
API Chatbot

  method: **POST**

  link: http://127.0.0.1:8000/api/question/

```python
data = {
  "content" : "Nội dung"
}
```