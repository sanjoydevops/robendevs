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




name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: [self-hosted, Windows, X64]
    env:
      REGISTRY: ${{ secrets.DOCKER_REGISTRY }}
      USERNAME: ${{ secrets.DOCKER_USERNAME }}
      PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      BACKEND_IMAGE: ${{ secrets.BACKEND_IMAGE }}
      FRONTEND_IMAGE: ${{ secrets.FRONTEND_IMAGE }}
      DOCKER_BUILDKIT: 0
    steps:
      - name: Use default Docker context
        run: docker context use default
        shell: pwsh
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ env.USERNAME }}
          password: ${{ env.PASSWORD }}

      - name: Build and push backend image
        uses: docker/build-push-action@v5
        with:
          context: ./apiserver
          file: ./apiserver/Dockerfile.backend
          push: true
          tags: ${{ env.BACKEND_IMAGE }}

      - name: Build and push frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./client
          file: ./client/Dockerfile.frontend
          push: true
          tags: ${{ env.FRONTEND_IMAGE }}

  deploy:
    needs: build-and-push
    runs-on: [self-hosted, Windows, X64]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Kubeconfig
        uses: azure/setup-kubectl@v3
        with:
          version: 'latest'

      - name: Set Namespace
        id: set-namespace
        run: |
          if [[ "${GITHUB_REF##*/}" == "main" ]]; then
            echo "namespace=dev" >> $GITHUB_OUTPUT
          elif [[ "${GITHUB_REF##*/}" == "pre-release/v1" ]]; then
            echo "namespace=prepod" >> $GITHUB_OUTPUT
          elif [[ "${GITHUB_REF##*/}" == "release/v1" ]]; then
            echo "namespace=release" >> $GITHUB_OUTPUT
          else
            echo "namespace=dev" >> $GITHUB_OUTPUT
          fi

      - name: Apply Kubernetes manifests
        run: |
          kubectl apply -n ${{ steps.set-namespace.outputs.namespace }} -f k8s/Structure/
          kubectl apply -n ${{ steps.set-namespace.outputs.namespace }} -f k8s/Observability/