# articast

## Setup

### asdf を使って Node.js と npm モジュールをインストールする

ref: [Getting Started \| asdf](https://asdf-vm.com/guide/getting-started.html)

```
asdf install

cd articast/src/
npm install
```

### 環境変数を設定する
.env.sample をコピーして、.env を作成し、環境変数を設定する。

### データベースを作成する

- ref:
  - https://www.prisma.io/dataguide/mysql/authentication-and-authorization/user-management-and-authentication
  - https://www.prisma.io/dataguide/mysql/create-and-delete-databases-and-tables#how-do-you-create-a-new-database

```
mysql> show databases;
mysql> CREATE DATABASE <db_name>;
```

### LocalStack を起動する

```zsh
cd articast/localstack/
docker-compose up
```

## マイグレーションの実行方法

```
npx prisma migrate dev
```