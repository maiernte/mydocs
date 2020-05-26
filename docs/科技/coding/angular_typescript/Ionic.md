[How to add Tabs Bar](https://www.freakyjolly.com/ionic-4-how-to-add-tabs-bar-and-create-tab-navigation-in-ionic-4-application/)

[How to Combine Ionic 4 Tabs and Side Menu Navigation](https://ionicacademy.com/ionic-4-tabs-side-menu/)

[Passing Data between Routes](https://netbasal.com/set-state-object-when-navigating-in-angular-7-2-b87c5b977bb)

```javascript
@Component({
  template: `<a (click)="navigateWithState()">Go</a>`,
})
export class AppComponent  {
  constructor(public router: Router) {}
  navigateWithState() {
    this.router.navigateByUrl('/123', { state: { hello: 'world' } });
  }
}
```

```html
<a routerLink="/details" [state]="{ hello: 'world' }">Go</a>`
```

Receiver

```javascript
import { ActivatedRoute } from '@angular/router';
export class DetailsPageComponent implements OnInit {
  state$: Observable<object>;
  constructor(public activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
  }
}

===========================
this.state$ =  this.router.events.pipe(
  filter(e => e instanceof NavigationStart),
  map(() => this.router.getCurrentNavigation().extras.state)
)
    
```



同步传输

```
const routes: Routes = [
	{ path: 'product/:id', component: ProductComponent }
];
=============================================================
constructor(private route: ActivatedRoute) {
route.params.subscribe(params => { this.id = params['id']; });
}
```



Ionic Gererate

```sh
ionic generate
ionic generate page
ionic generate page contact
ionic generate component contact/form
ionic generate component login-form --change-detection=OnPush
ionic generate directive ripple --skip-import
ionic generate service api/user
```

[Offline Mode](https://devdactic.com/ionic-4-offline-mode/)

[CRUD Function for Ionic](https://ionicacademy.com/ionic-storage-crud-operations/)

[using native storage](https://www.freakyjolly.com/ionic-4-storage-tutorial-in-ionic-using-native-storage-plugin/)

[Firebase Storage](https://firebase.google.com/docs/storage)



Storage

- [Native Storage](https://ionicframework.com/docs/native/native-storage)
- [Ionic Storage](https://ionicframework.com/docs/building/storage)
- [Ionic sqlite](https://ionicframework.com/docs/v3/native/sqlite/)   [Ionic 4 Sqlite](https://ionicframework.com/docs/native/sqlite)

[Cordova Plugin File](https://github.com/apache/cordova-plugin-file)    [Ionic-Native-File](https://ionicframework.com/docs/native/file) :ok: 创建SQLite，然后通过Webdav同步数据。

- cordova.file.applicationDirectory
- cordova.file.applicationStorageDirectory
- cordova.file.dataDirectory :+1:
- cordova.file.cacheDirectory

[如何使用第三方库](https://github.com/ionic-team/ionic/issues/9422) 把 **N.js** 文件放到 **assets/js** , 然后在 `/src/index.html` 中添加` <script src="assets/js/N.js">`

[TreeView](https://ourcodeworld.com/articles/read/146/top-5-best-tree-view-jquery-and-javascript-plugins) 5 种办法

[Ionic TreeView](https://market.ionicframework.com/plugins/multilevel-tree-view-component-for-ionic-4)

[Date Picker](https://market.ionicframework.com/plugins/ionicdatepicker)

[Error File](https://forum.ionicframework.com/t/ionic-4-cordova-file-plugin/157138)  

```
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file';

@Injectable({
  providedIn: 'root'
})
export class BaseModelService {
  constructor(private file: File, private platform: Platform) {}

  async save() {
    await this.platform.ready();
    return this.file.writeFile(this.file.dataDirectory, 'hello.json', JSON.stringify({test:'value'}), {replace:true});
  }
}
```

[DataTable](http://masteringionic.com/blog/2018-02-13-implementing-angular-data-tables-in-an-ionic-application/)

```
npm install @swimlane/ngx-datatable --save
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
imports:[NgxDatatableModule,]

<ngx-datatable
       [sortType]="'multi'"
       [headerHeight]="50"
       [footerHeight]="50"
       [rowHeight]="50"
       [rows]="rows"
       [columns]="columns"
       [columnMode]="'force'"
       [limit]="10">
     </ngx-datatable>
```



### Electron

[Run Capacitor Electron](https://capacitor.ionicframework.com/docs/getting-started)

[Ionic Electron](https://www.9lessons.info/2018/10/ionic-electron-desktop-app.html) :+1: 按照文章中来做，但下面的要改一下。

```json
# tsconfig.json
"target": "es5", # not es2015

# 或者 添加
"browserslist": [
  "> 5%"
]
```

**package.json**

```json
"main": "src/electron-starter.js",
"scripts": {
    "ng": "ng",
    "start": "electron .",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "electron": "electron .",
    "electron-serve": "ng build --prod && electron .",
    "windows-release": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=src/assets/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName='Electron Tutorial App'",
    "windows-build": "node src/windows-build.js"
},
.....

```



## SQLite

[Ionic4 SQlite queries](https://devdactic.com/ionic-4-sqlite-queries/)

[SQL.js](https://github.com/kripken/sql.js/) 

[sql.js Document](http://kripken.github.io/sql.js/documentation/#http://kripken.github.io/sql.js/documentation/class/Database.html)

## FileSystem



[Chrome Developer Tools Doc](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage)

[Where To Storage File](https://github.com/apache/cordova-plugin-file#where-to-store-files)

### Chrome quirks

- Chrome filesystem is not immediately ready after device ready event. As a workaround you can subscribe to `filePluginIsReady` event. Example:

```javascript
window.addEventListener('filePluginIsReady', function(){ console.log('File plugin is ready');}, false);
```

You can use `window.isFilePluginReadyRaised` function to check whether event was already raised.

- window.requestFileSystem TEMPORARY and PERSISTENT filesystem quotas are not limited in Chrome.
- To increase persistent storage in Chrome you need to call `window.initPersistentFileSystem` method. Persistent storage quota is 5 MB by default.
- Chrome requires `--allow-file-access-from-files` run argument to support API via `file:///` protocol.
- `File` object will be not changed if you use flag `{create:true}` when getting an existing `Entry`.
- events `cancelable` property is set to true in Chrome. This is contrary to the [specification](http://dev.w3.org/2009/dap/file-system/file-writer.html).
- `toURL` function in Chrome returns `filesystem:`-prefixed path depending on application host. For example, `filesystem:file:///persistent/somefile.txt`, `filesystem:http://localhost:8080/persistent/somefile.txt`.
- `toURL` function result does not contain trailing slash in case of directory entry. Chrome resolves directories with slash-trailed urls correctly though.
- `resolveLocalFileSystemURL` method requires the inbound `url` to have `filesystem` prefix. For example, `url` parameter for `resolveLocalFileSystemURL` should be in the form `filesystem:file:///persistent/somefile.txt` as opposed to the form `file:///persistent/somefile.txt` in Android.
- Deprecated `toNativeURL` function is not supported and does not have a stub.
- `setMetadata` function is not stated in the specifications and not supported.
- INVALID_MODIFICATION_ERR (code: 9) is thrown instead of SYNTAX_ERR(code: 8) on requesting of a non-existant filesystem.
- INVALID_MODIFICATION_ERR (code: 9) is thrown instead of PATH_EXISTS_ERR(code: 12) on trying to exclusively create a file or directory, which already exists.
- INVALID_MODIFICATION_ERR (code: 9) is thrown instead of NO_MODIFICATION_ALLOWED_ERR(code: 6) on trying to call removeRecursively on the root file system.
- INVALID_MODIFICATION_ERR (code: 9) is thrown instead of NOT_FOUND_ERR(code: 1) on trying to moveTo directory that does not exist.

### Deploy to Github Pages

[参考](https://stackoverflow.com/questions/53036381/how-to-deploy-ionic-4-app-to-github-pages)

Here is how to use angular-cli-ghpages with Ionic 4:

1. Create your Ionic project (`ionic start MyApp blank`)
2. Install the plugin: `npm i angular-cli-ghpages --save`
3. Connect your project with your github repository.
4. Navigate in the terminal to your project directory and execute `ionic build --prod -- --base-href https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/`, what will create the `www` folder, which is comparable to the `dist` folder for Angular. It also sets your github page domain as base href in index.html.
5. Then run the plugin: `npx angular-cli-ghpages --dir=www`. The flag at the end points to the `www` folder, where the `index.html` file is located that will be displayed at *https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/*. The plugin will create a branch called "gh-pages" in your project that contains all files which are located in your www folder.
6. As a last step you have to select the "gh-page" branch in the settings of your project (*https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/settings*) as a source for your github page.

You can also set different branch names if you don't want to use the default "gh-pages" name (also master is possible, but then you should keep the source files in a different branch). Just run the plugin like this: `npx angular-cli-ghpages --branch=BRANCH-NAME --dir=www`.

Like [Gary Großgarten](https://stackoverflow.com/users/9330080/gary-großgarten) suggested, you can create a script for it which makes it easier. For Ionic it would be: `ionic build --prod -- --base-href https://YOUR_GITHUB_USERNAME.github.io/YOUR_PROJECT_NAME/ && npx angular-cli-ghpages --branch=BRANCH-NAME --dir=www`



### PlugIn

[Long Press 长按](https://www.npmjs.com/package/ionic-long-press)