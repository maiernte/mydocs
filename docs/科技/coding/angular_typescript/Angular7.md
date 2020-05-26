

安装

```sh
npm npm install -g @angular/cli # angular 开发环境
ng --version #
ng --help
```

新建模块

```sh
ng generate component hello-world
```

使用模块 `@Input`

方式一： `<img class="product-image" [src]="product.imageUrl">`

方式二：`<img src="{{ product.imageUrl }}">`



监听事件 92页

```html
<div class="inventory-app">
 <products-list
 [productList]="products"
 (onProductSelected)="productWasSelected($event)">
 </products-list>
</div>
```

```javascript
import {
  Component,
  EventEmitter,
  Input,
  Output 
} from '@angular/core';

@Input() productList: Product[];
@Output() onProductSelected: EventEmitter<Product>;
```



[Singleton Service](https://angular.io/guide/singleton-services)

本地 URL

```javascript
import { DomSanitizer } from '@angular/platform-browser';
const data = 'some text';
const blob = new Blob([data], { type: 'application/octet-stream' });
let url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
console.log("blob url", url)
```



#### SQLite

##### INSERT INTO IF NOT EXISTS 

[Document](https://www.tutlane.com/tutorial/sqlite/sqlite-replace-statement)

```sql
INSERT INTO memos(id,text) 
SELECT 5, 'text to insert' 
WHERE NOT EXISTS(SELECT 1 FROM memos WHERE id = 5 AND text = 'text to insert');
```

##### REPLACE

```sqlite
INSERT OR REPLACEINTO TABLE (column_list) VALUES (value_list);
# OR
REPLACE INTO table_name ( col1, col2 ) VALUES ( val1, val2 );
```

##### Export to SQL

[websqldump.js](https://github.com/sdesalas/websqldump)

##### Proxy

`angular.json`

```json
"browserTarget": "app:build"
"proxyConfig": "src/proxy.conf.json"
```

`proxy.conf.json`  but not working.....

```
{
  "/dav": {
    "target": "https://dav.jianguoyun.com/dav/",
    "secure": false
  } 
}
```



####  UI

[Google Materia](https://material.angular.io/)

[ng-Lightning](https://ng-lightning.github.io/ng-lightning/#/)