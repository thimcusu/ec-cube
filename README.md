# EC-CUBE 4.0

## Install

```
    docker-compose up -d
```

### Check name of container ec-cube: `docker ps`

```
    docker exec -it [name_ec-cube_images|id_ec-cube] bash
```

### Install EC-CUBE

```
    bin/console eccube:install
```

### Run dev development

```
    bin/console server:run
```

You may need set env to run in development:
**
APP_ENV=dev
APP_DEBUG=1
**

## インストール

### EC-CUBE 4.0 のインストール方法

開発ドキュメントの [インストール方法](https://doc4.ec-cube.net/quickstart_install) の手順に従ってインストールしてください。
