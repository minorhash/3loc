pw=$(pwd)

echo $pw
str=${pw: -4}

echo $str

pm2 restart bin/www 2>&1|grep --color ids|awk '{print $8}'
