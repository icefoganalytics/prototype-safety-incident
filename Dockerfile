FROM oraclelinux:9

RUN dnf config-manager --set-enabled ol9_appstream
RUN dnf install -y nodejs




#RUN yum upgrade -y && yum install yum-utils
#RUN  yum -y install oracle-release-el7 && \
#     yum-config-manager --enable ol7_oracle_instantclient && \
#     yum -y install oracle-instantclient19.3-basiclite && \
#     rm -rf /var/cache/yum

#RUN yum-config-manager --enable *addons
#RUN yum install -y gcc-c++ make libaio



#RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash -
#RUN yum install -y nodejs

RUN mkdir /home/node 
RUN mkdir /home/node/web 

WORKDIR /home/node/web
COPY src/web/package*.json ./
COPY .env* ./
RUN npm install && npm cache clean --force --loglevel=error
COPY src/web ./

RUN mkdir /home/node/app 
RUN mkdir /home/node/app/db
WORKDIR /home/node/app
COPY src/api/package*.json ./
COPY .env* ./

#ENV NODE_ENV=test
RUN npm install && npm cache clean --force --loglevel=error
COPY src/api ./

ENV TZ America/Whitehorse

RUN npm run build
EXPOSE 3000

WORKDIR /home/node/web
#ENV NODE_ENV=production
RUN npm run build

WORKDIR /home/node/app

CMD ["node", "./dist/index.js"]
