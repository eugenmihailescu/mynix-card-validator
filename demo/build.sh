DIR=$(dirname $0)
OUTPUT=${DIR}/bundle.js
MINIFIED=${DIR}/bundle.min.js


echo "Creating an single monolitic bundle .js file: $OUTPUT"

cat "${DIR}/../dist/bundle.js" > $OUTPUT
echo -e "\n" >> $OUTPUT;
cat "${DIR}/app.js" >> $OUTPUT

if [ -n "$(which closure-compiler)" ];then
	echo "Minifying the output .js file : $MINIFIED"
	closure-compiler --js=$OUTPUT --js_output_file=$MINIFIED --compilation_level=ADVANCED_OPTIMIZATIONS
else
	echo "Could not minify due to no closure-compiler found"	
fi