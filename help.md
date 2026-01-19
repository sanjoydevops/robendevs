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



Use Helm to install grapana and prometheus and also monitor cluster and resource

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack


export POD_NAME=$(kubectl --namespace default get pod -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=kube-prometheus-stack" -oname)

kubectl --namespace default get secrets kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo

Permantly forward to nodeport grapana

kubectl get svc -n default | grep grafana
kubectl patch svc kube-prometheus-stack-grafana -n default -p '{"spec": {"type": "NodePort"}}'
kubectl get svc kube-prometheus-stack-grafana -n default