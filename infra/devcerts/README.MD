# Generate new certificates for development

Run the following command to generate new certificates key and crt files, case necessary

```bash
mkcert -key-file server.key -cert-file server.crt app.carties.local api.carties.local id.carties.local
```

```bash
kubectl create secret tls carties-app-tls --key server.key --cert server.crt 
```