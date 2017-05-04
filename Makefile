all:
	npm install
push:
	scp -r ./* root@yuin7688duo.local:/root/work/7688duo-test/
pull:
	git pull --rebase
