BROWSERIFY = node_modules/browserify/bin/cmd.js

build-browserify-example:
	$(BROWSERIFY) example/commonjs-controller.js > example/browserified.js

run-example:
	python -m SimpleHTTPServer
