
nod=$(ps1.sh nodemon|awk '{print $2}')

for i in $nod
do
    echo $i
    kill $i
done
