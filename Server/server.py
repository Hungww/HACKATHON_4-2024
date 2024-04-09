from flask import Flask,jsonify
from flask import request
import pandas as pd
import numpy as np
import tldextract   
import Levenshtein as lev
app = Flask(__name__)
web_df = pd.read_csv('top10milliondomains.csv')

#print the first 5 rows of the dataframe
print(web_df.head())
#print the last 5 rows of the dataframe
print(web_df.tail())
urls= web_df['Domain'].tolist()
scam_list=["w88one.vip"]
def get_domain(url):
    ext = tldextract.extract(url)
    print(ext)
    
    return ext

def is_missspell_domain(domain, threshold=0.9):
    max_similarity = 0
    max_url = ''
    for url in urls:
        similarity = lev.ratio(domain, url)
        if similarity > max_similarity:
            max_similarity = similarity
            max_url = url
        if similarity > threshold:
            return False
    print("Max similarity: ", max_similarity)
    print("Max url: ", max_url)
    return True

def fishing_check(target):
    test = get_domain(target)
    domain= test.domain
    suffix = test.suffix
    print(" Domain: ", domain)
    print(" Suffix: ", suffix)
    if f"{domain}.{suffix}" in urls:
        print("Domain is in the list of top 10 million domains")
        return False
    elif f"{domain}.{suffix}" in scam_list:
        print("Domain is in the list of scam domains")
        return True
    elif is_missspell_domain(domain):
        return True


@app.get('/')
def hello_world():
    target= request.args.get('target',default = '*', type = str)
    print("Target: ", target)
    res= fishing_check(target)
    response= None
    if res:
        response = jsonify(message="scam")
    else:
        response = jsonify(message="ham")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    

if __name__ == '__main__':
    app.run()