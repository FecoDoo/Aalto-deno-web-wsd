if [ -f "./answer.zip" ];then
    rm -rf "./answer.zip"
fi
zip -r answer.zip app.js index.ejs
