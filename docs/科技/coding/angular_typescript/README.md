 [Angular7](科技/coding/angular_typescript/Angular7.md) 

 [Angular_invoking_webdav](科技/coding/angular_typescript/Angular_invoking_webdav.md) 

 [Ionic](科技/coding/angular_typescript/Ionic.md) 

 [Javascript摘要](科技/coding/angular_typescript/Javascript摘要.md) 

[新建TypeScript项目](https://www.digitalocean.com/community/tutorials/typescript-new-project)


编译typescript  `tsc -p tsconfig.json`

运行 
`Node.js Server node app.js` 或者
`ionic ionic serve or ng serve`



[UnitTest Mocha](https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2)

安装包

`$ npm install chai mocha ts-node @types/chai @types/mocha --save-dev`

`npm init` 新建一个包，生成 package.json 并添加

```json
{
  "scripts": {
    "test": "mocha -r ts-node/register TS/**/*.spec.ts",
  },
}
```

运行测试 `npm run test`

