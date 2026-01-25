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


Now create a Self hosted runner
Go to your GitHub repo → Settings → Actions → Runners.



Grafana and prometheus

git clone --depth 1 https://github.com/prometheus-operator/kube-prometheus.git
cd kube-prometheus
kubectl apply -f manifests/setup/
kubectl create -f manifests/setup/0alertmanagerConfigCustomResourceDefinition.yaml
kubectl delete -f manifests/setup/0alertmanagerConfigCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0alertmanagerConfigCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0alertmanagerCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0prometheusagentCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0prometheusCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0scrapeconfigCustomResourceDefinition.yaml
kubectl create -f manifests/setup/0thanosrulerCustomResourceDefinition.yaml
kubectl apply -f manifests/setup/


kubectl apply -f manifests/
kubectl apply -f manifests/pv-pvc/

kubectl apply -f experimental/metrics-server/

username: admin
pass: admin
