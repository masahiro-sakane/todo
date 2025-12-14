# TODO App

フルスタックTODOアプリケーション - React + Node.js + SQLite で構築された機能豊富なタスク管理アプリケーション

## 特徴

- **基本機能**: TODO の追加・編集・削除・完了マーク
- **優先度設定**: 高・中・低の3段階の優先度管理
- **期限管理**: 期限日の設定と期限切れアラート
- **カテゴリ分類**: カスタムカテゴリの作成とTODOの分類
- **フィルタリング**: 完了状態、優先度、カテゴリによるフィルタリング
- **ソート機能**: 作成日時、優先度、期限日でのソート
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 技術スタック

### フロントエンド
- **React 18**: UIライブラリ
- **Vite**: 高速ビルドツール
- **Context API**: 状態管理
- **Axios**: HTTP通信
- **date-fns**: 日付処理

### バックエンド
- **Node.js**: ランタイム環境
- **Express**: Webフレームワーク
- **better-sqlite3**: SQLiteデータベース
- **express-validator**: バリデーション
- **CORS**: クロスオリジンリクエスト対応

### データベース
- **SQLite**: 軽量で設定不要のデータベース

## プロジェクト構造

```
todo/
├── client/                 # React フロントエンド
│   ├── src/
│   │   ├── components/    # UIコンポーネント
│   │   ├── context/       # Context API
│   │   ├── hooks/         # カスタムフック
│   │   ├── services/      # API通信
│   │   └── utils/         # ユーティリティ
│   └── package.json
│
├── server/                 # Node.js バックエンド
│   ├── config/            # データベース設定
│   ├── controllers/       # ビジネスロジック
│   ├── models/            # データアクセス層
│   ├── routes/            # APIルート
│   ├── middleware/        # ミドルウェア
│   ├── database/          # SQLiteデータベース
│   └── package.json
│
└── package.json           # ルートパッケージ
```

## セットアップ

### 必要な環境
- Node.js 18.x 以上
- npm 9.x 以上

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd todo
```

2. すべての依存関係をインストール
```bash
npm run install:all
```

これにより、ルート、クライアント、サーバーのすべての依存関係がインストールされます。

## 起動方法

### 開発モード（推奨）

フロントエンドとバックエンドを同時に起動:
```bash
npm run dev
```

これにより以下のサーバーが起動します:
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:5000

### 個別起動

フロントエンドのみ:
```bash
npm run dev:client
```

バックエンドのみ:
```bash
npm run dev:server
```

### 本番ビルド

フロントエンドをビルド:
```bash
npm run build
```

ビルドされたファイルは `client/dist` に生成されます。

本番サーバーを起動:
```bash
npm start
```

## API エンドポイント

### TODOs API

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET | `/api/todos` | 全TODO取得（フィルタリング対応） |
| GET | `/api/todos/:id` | 特定TODO取得 |
| POST | `/api/todos` | TODO作成 |
| PUT | `/api/todos/:id` | TODO更新 |
| PATCH | `/api/todos/:id/toggle` | 完了状態トグル |
| DELETE | `/api/todos/:id` | TODO削除 |

### Categories API

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET | `/api/categories` | 全カテゴリ取得 |
| GET | `/api/categories/:id` | 特定カテゴリ取得 |
| POST | `/api/categories` | カテゴリ作成 |
| PUT | `/api/categories/:id` | カテゴリ更新 |
| DELETE | `/api/categories/:id` | カテゴリ削除 |

## データベース

SQLiteデータベースは初回起動時に自動的に作成されます。

### テーブル構造

#### categories
- id: INTEGER (主キー)
- name: TEXT (ユニーク)
- color: TEXT (16進数カラーコード)
- created_at: DATETIME

#### todos
- id: INTEGER (主キー)
- title: TEXT
- description: TEXT
- completed: BOOLEAN
- priority: TEXT (low/medium/high)
- due_date: DATE
- category_id: INTEGER (外部キー)
- created_at: DATETIME
- updated_at: DATETIME

デフォルトで以下のカテゴリが作成されます:
- 仕事
- 個人
- 買い物
- その他

## 開発

### 開発サーバー

開発モードでは以下の機能が有効です:
- **ホットリロード**: ファイル変更時の自動リロード
- **プロキシ設定**: フロントエンドから `/api` へのリクエストは自動的にバックエンドに転送

### コード構成

**フロントエンド:**
- コンポーネントは機能単位で分割
- Context APIで状態管理
- カスタムフックで再利用性を向上

**バックエンド:**
- MVCパターンに準拠
- モデル層でデータアクセス
- コントローラー層でビジネスロジック
- ミドルウェアでバリデーションとエラーハンドリング

## セキュリティ

- **SQLインジェクション対策**: プリペアドステートメント使用
- **XSS対策**: Reactの自動エスケープ
- **バリデーション**: フロント・バック両方で実施
- **CORS**: 適切なオリジン設定

## 拡張性

将来的な機能追加に対応可能な設計:
- ユーザー認証（JWT）
- マルチユーザー対応
- サブタスク機能
- タグ機能
- 添付ファイル機能
- リマインダー通知

## トラブルシューティング

### ポートが既に使用されている

別のアプリケーションがポート5000または5173を使用している場合:

**バックエンド（server/server.js）:**
```javascript
const PORT = process.env.PORT || 5000;
```

**フロントエンド（client/vite.config.js）:**
```javascript
server: {
  port: 5173,
  // ...
}
```

### データベースのリセット

データベースを初期状態にリセットする:
```bash
cd server/database
rm todo.db
cd ../..
npm run dev:server
```

サーバー起動時に新しいデータベースが作成されます。

## ライセンス

MIT License

## 作成者

Claude Code で生成
