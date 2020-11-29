curl -v -H "Cookie: sid=f8e6f748-327b-4a34-a8df-8057ad669d7d" 127.0.0.1:7777/accounts

curl -v -X POST -H "Cookie: sid=f8e6f748-327b-4a34-a8df-8057ad669d7d" -d 'amount=100' http://127.0.0.1:7777/accounts/transfer/33/34


