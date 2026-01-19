For ingress must have install ingress-controller

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml

kubectl get pods -n ingress-nginx

kubectl get svc -n ingress-nginx

kubectl exec -it backend-d4697554f-qw2hg -n dev -- node dev-data/seed.js

kubectl exec -it postgres-7cdf554cf8-4mljl -n dev -- sh
psql -U postgres -d sampledb


1stly signup test3@gmail.com

SELECT id, email, status, is_verified FROM users WHERE email = 'test3@gmail.com';

UPDATE users SET status = 'active', is_verified = true WHERE email = 'test3@gmail.com';