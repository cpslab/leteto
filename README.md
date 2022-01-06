# Leteto

Leteto は特定コミュニティ内での勉強会などを促進を目指したプロダクトです。

## Description

**Le**arn **Te**chonology **To**gether  
Leteto は「一緒に技術を学ぼう」という合言葉のもとに、  
勉強会・LT 会・Handson などの開催を企画するための掲示板ツールです。

<!-- ## Demo -->

<!-- ## VS. -->

## Requirement

development 環境には、python・pipenv・node.js・yarn  
production 環境には、docker  
が必要になります。

## Usage

本リポジトリは minirepo ライクになっておりそれぞれで使い方が異なります。

---

backend の立て方

```
> cd backend
> pipenv install
> pipenv shell
> python manage.py migrate
> python manage.py createsuperuser
> python manage.py runserver
```

frontend の立て方

```
> cd frontend
> yarn
> yarn start
```

以上の通りに backend と frontend を立てると開発環境が立ち上がります。  
今後 Docker だけで建てられるように調整も行う予定です。

---

Production 環境の立て方

現在は Heroku を用いて行えるようになっています。

一般的なデプロイ手順である。

- heroku cli のインストール
- heroku へのログイン（`heroku login`）
- アプリケーションの作成（`heroku create hogehoge`）
- stack を container へ変更（`heroku stack:set container`）
- PostgresQL の用意（`heroku addons:create heroku-postgresql:hobby-dev`）
- Heroku へ Push（`git push heroku master`）

を行うとデプロイされます。

しかし、Leteto は特定のコミュニティにおいての利用を念頭に置かれているため、  
コミュニティ内のサーバ内で立ち上げられるようなオンプレミス版の設定ファイルを用意する予定です。

---

<!-- ## Install -->

<!-- ## Contribution -->

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[narusei](https://github.com/narusei)
