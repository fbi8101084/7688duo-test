all:
	npm install
push:
	scp -R ./* root@yuin7688duo.local:/root/work/7688duo-test/
