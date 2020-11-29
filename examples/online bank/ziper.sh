if [ -f "./answer.zip" ];then
    rm -rf "./answer.zip"
fi
zip -r answer.zip app.js login.ejs register.ejs accounts.ejs
