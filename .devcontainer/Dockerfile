ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
RUN echo "deb http://ftp.debian.org/debian buster-backports main" | sudo tee /etc/apt/sources.list.d/backports.list
RUN apt-get update; export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends s3cmd
RUN npm install -g n
RUN n 14.17.5