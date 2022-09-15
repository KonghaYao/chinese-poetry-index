
import meilisearch 
import os
client = meilisearch.Client(os.environ.get('MEILI_SERVER'), os.environ.get('MEILI_MASTER_KEY')) # masterKey 是密码

# index 相当于数据库的表
index = client.index('poetry')

 
dirs = os.listdir( '../csv' )
print("共",len(dirs))
index.update_filterable_attributes([
    'belongToName',
    "author"
])
index.update_searchable_attributes(['author','title'])
index.update_ranking_rules([
    "attribute"
    "typo",
    "exactness",
    "words",
    "proximity",
    "sort",
])

import csv
number = index.get_stats().get('numberOfDocuments')

if number<320000:  
    # 输出所有文件和文件夹
    for path in dirs:
        with open('../csv/'+path,mode='r',encoding='utf-8-sig') as f:
            
            reader = csv.DictReader(f)
            col = []
            for row in reader:
                col.append(row)
            index.add_documents(col,'id')
            print(path,"完成")
            
    try:
        Key = client.get_key("8866472f-a457-470b-94ab-7248e9801049")
    except:
        Key = client.create_key(options={
            'description': 'Viewer Key',
            'actions': ["search"],
            'indexes': ['poetry'],
            'expiresAt': None,
            "uid":"8866472f-a457-470b-94ab-7248e9801049"
        })
    print('你可以使用',Key.get('key'))
