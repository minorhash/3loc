cd scss

for i in *.scss
do
    echo $i
    se=$(echo $i|sed s/sass/css/g)
    sass --no-source-map $i ../css/$se

done

