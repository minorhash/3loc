if [ -z $1 ];then
echo "usage"
else
    se=$(echo $1|sed -i s/scss/css/g)
    echo $se
#sass --sourcemap=none $1
fi

