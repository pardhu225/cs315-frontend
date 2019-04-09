cd dist
scp -i ../../cs315instance.pem -r ../dist ubuntu@ec2-13-59-121-64.us-east-2.compute.amazonaws.com:~/frontend-build
cd ..
