import json


def article(path):
    data = json.load(open(path))
    json_data = dict()
    for index, value in enumerate(data):
        if len(value['MAPC']) not in json_data.keys():
            json_data[len(value['MAPC'])] = []
        json_data[len(value['MAPC'])].append(value)

    with open("/home/vu/Documents/Phap_dien_VN/BE/static/JSON/get.json", "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False)


article("/home/vu/Documents/Phap_dien_VN/BE/static/JSON/allTree_json.json")
