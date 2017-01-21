DIR=$(dirname $0)
OUTPUT=${DIR}/bundle.js
MINIFIED=${DIR}/bundle.min.js


echo "Creating an single monolitic bundle .js file: $OUTPUT"

echo "" > $OUTPUT;

for f in "utils" "asia" "europe" "pacific" "world" "constants" "postal-codes-lengths" "braintree";do
	cat "${DIR}/../src/libs/js/${f}.js" >> $OUTPUT
	echo -e "\n" >> $OUTPUT;
done

cat "${DIR}/../src/mynix-card-validator.js" >> $OUTPUT

if [ -n "$(which closure-compiler)" ];then
	echo "Minifying the output .js file : $MINIFIED"
	closure-compiler --js=$OUTPUT --js_output_file=$MINIFIED --compilation_level=SIMPLE_OPTIMIZATIONS
else
	echo "Could not minify due to no closure-compiler found"	
fi