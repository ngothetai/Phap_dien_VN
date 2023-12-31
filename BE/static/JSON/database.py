import sqlite3
import json
from tqdm import tqdm


class DatabaseConnection:
    def __init__(self, db_file, topic_json, heading_json, alltree_json):
        self.db_file = db_file
        self.connection = None
        self.topic_json = json.loads(open(topic_json, "r").read())
        self.heading_json = json.loads(open(heading_json, "r").read())
        self.alltree_json = json.loads(open(alltree_json, "r").read())
        self.connect()

    def connect(self):
        try:
            self.connection = sqlite3.connect(self.db_file)
            print("Connected to the database")
        except sqlite3.Error as e:
            print(f"Error connecting to the database: {e}")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Disconnected from the database")
        else:
            print("No active connection to disconnect")

    def __table(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        print(cursor.fetchall())

    def insert_topic(self, table_name, json_topic):
        cursor = self.connection.cursor()
        for index, data_topic in enumerate(json_topic):
            cursor.execute(
                f"INSERT INTO {table_name} VALUES ('{data_topic['Value']}', '{data_topic['Text']}');")
        self.connection.commit()

    def insert_heading(self, table_name, json_heading):
        cursor = self.connection.cursor()
        for index, value in enumerate(json_heading):
            id_topic = value['ChuDe']
            id_heading = value['Value']
            rank = value['STT']
            data = value['Text']

            # get topic from id_topic
            cursor.execute(
                "SELECT * FROM app_topic WHERE topic_id=?", (id_topic,))
            topic = cursor.fetchone()

            # insert heading
            if topic:
                cursor.execute(
                    f"INSERT INTO {table_name} VALUES (?, ?, ?, ?);", (id_heading, data, rank, topic[0]))
            else:
                print(f"Topic with id {id_topic} not found.")

        self.connection.commit()

    def insert_article(self, table_name, json_article):
        cursor = self.connection.cursor()
        for index, value in enumerate(json_article):
            id_article = value['ID']
            rank = value['ChiMuc']
            mapc = value['MAPC']
            name_article = value['TEN']
            id_heading = value['DeMucID']

            # Retrieve heading object
            cursor.execute(
                "SELECT * FROM app_heading WHERE heading_id=?", (id_heading,))
            heading = cursor.fetchone()

            if heading:
                # Instead of passing the entire heading object, pass its primary key
                cursor.execute(
                    f"INSERT INTO {table_name} VALUES (?, ?, ?, ?, ?);",
                    (id_article, rank, mapc, name_article, heading[0]),
                )
            else:
                print(f"Heading with id {id_heading} not found.")

        self.connection.commit()

    def article(self, table_name, json_article, len_MAPC=20):
        print(f"INSERT DATA {len_MAPC}")
        cursor = self.connection.cursor()
        json_data = dict()
        for index, value in enumerate(json_article):
            if len(value["MAPC"]) not in json_data.keys():
                json_data[len(value["MAPC"])] = []
            json_data[len(value["MAPC"])].append(value)

        json_data = json_data[len_MAPC]
        for index, value in tqdm(enumerate(json_data)):
            id_article = value['ID']
            rank = value['ChiMuc']
            mapc = value['MAPC']
            name_article = value['TEN']
            id_topic = value['ChuDeID']
            id_heading = value['DeMucID']

            cursor.execute(
                "SELECT * FROM app_topic WHERE topic_id=?", (id_topic,))
            topic = cursor.fetchone()
            cursor.execute(
                "SELECT * FROM app_heading WHERE heading_id=?", (id_heading,))
            heading = cursor.fetchone()

            if topic and heading:

                cursor.execute(
                    f"SELECT * FROM {table_name} WHERE mapc = ?", (mapc[:-20],))
                mapc_parent = cursor.fetchone()
                if mapc_parent is not None:
                    mapc_parent = mapc_parent[0]
                cursor.execute(
                    f"INSERT INTO {table_name} VALUES (?, ?, ?, ?, ?, ?, ?);",
                    (id_article, rank, mapc, name_article,
                     heading[0], mapc_parent, topic[0]),
                )
        self.connection.commit()


database = DatabaseConnection("db.sqlite3",
                              "static/JSON/topics_json.json",
                              "static/JSON/headings_json.json",
                              "static/JSON/allTree_json.json")

database.insert_topic("app_topic", database.topic_json)
database.insert_heading("app_heading", database.heading_json)
database.article("app_article", database.alltree_json, 20)
database.article("app_article", database.alltree_json, 40)
database.article("app_article", database.alltree_json, 60)
database.article("app_article", database.alltree_json, 80)
database.article("app_article", database.alltree_json, 100)
database.article("app_article", database.alltree_json, 59)
database.article("app_article", database.alltree_json, 79)
