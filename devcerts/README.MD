# Creating Nginx Certificates Using Mkcert

To create local certificates for Nginx using Mkcert, follow these steps:

1. **Install Mkcert**: If you haven't already, install Mkcert by following the instructions on the [Mkcert GitHub page](https://github.com/FiloSottile/mkcert).

2. **Generate Certificates**: Run the following command to generate the certificates:
    ```sh
    mkcert -key-file carties.local -cert-file carties.local.crt app.carties.local api.carties.local id.carties.local
    ```

Nginx server should now be configured to use certificates.