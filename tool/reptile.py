import json

import requests
import re
import execjs
from bs4 import BeautifulSoup


def get_all_city():    # 爬取
    url = "https://ncov.dxy.cn/ncovh5/view/pneumonia"
    try:
        kv = {'user-agent': 'Mozilla/5.0'}  # 伪装成浏览器，headers
        r = requests.get(url, headers=kv)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
    except:
        print("失败")
    demo = r.text
    soup = BeautifulSoup(demo, "html.parser")
    info = re.search(r'\[(.*)\]', str(soup.find('script', attrs={'id': 'getAreaStat'})))
    info = json.loads(info.group(0))
    with open('D:\\data.json', 'w', encoding='utf-8') as file:
         file.write(json.dumps(info, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    get_all_city()

