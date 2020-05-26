;(function(win) {
  function isFunction(functionToCheck) {
   return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  }

  win.EditOnGithubPlugin = {}

  // 与 localServie 沟通的URL地址，编译参数，告诉服务器打开哪个文档。
  function buildUrl(fileurl, app) {
    let body = {
      para: fileurl,
      application: app
    };

    // let params = encodeURIComponent(JSON.stringify(body));
    let params = window.btoa(JSON.stringify(body));
    let url = `http://localhost:3001/lauch?params=${params}`
    return url
  }

  function create(docBase, docEditBase, title) {
    title = title || 'Edit on github'
    docEditBase = docEditBase || docBase.replace(/\/blob\//, '/edit/')

    function editDoc(event, vm) {
      var docName = vm.route.file
      if (docName) {
        var host = win.location.host;
        console.log('host url', host)
        var localhost = host.startsWith('localhost') || host.startsWith('127.0.0.1')
        if (localhost) {
          var fileUrl = buildUrl(docName, 'typora')
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", fileUrl, false ); // false for synchronous request
          xmlHttp.send( null );
          console.log('xmlHttp', xmlHttp.responseText)
        } else {
          var editLink = docEditBase + docName
          window.open(editLink)
        }
        
        event.preventDefault()
        return false
      } else {
        return true
      }
    }

    function openFile(event, vm) {
      var host = win.location.host;
      var localhost = host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('192.168.0')
      if (localhost) {
        var fileUrl = buildUrl(encodeURI(vm), null)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", fileUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        console.log('xmlHttp', xmlHttp.responseText)
      } else {
        window.alert("非本地服务，无法打开")
      }

      event.preventDefault()
    }

    win.EditOnGithubPlugin.editDoc = editDoc
    win.EditOnGithubPlugin.openFile = openFile

    function generateHeader(title) {
      return header = [
        '<div style="overflow: auto"><a/>',
        
        '<p style="float: right"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.onClick(event)">',
        title,
        '</a></p>',
        '</div>'
      ].join('')
    }
    
    // 确定是否要添加额外的 Button， 比如打开pdf文件的按钮。
    function getButton(content) {
      var pattern = /\[Button\]:[\ \t]+#[\ \t]+["'](?<button>[\S\ ]+)["']/
      var button = content.match(pattern)
      if (typeof(button) != 'undefined' && button != null) {
        return button.groups['button']
      } else {
        return null
      }
    }

    return function(hook, vm) {
      var extraButton = 'nobutton'
      win.EditOnGithubPlugin.onClick = function(event) {
        EditOnGithubPlugin.editDoc(event, vm)
      }

      hook.afterEach(function (html) {
        var header = isFunction(title) ? generateHeader(title(vm.route.file)) : generateHeader(title) 
        if (extraButton !== null) {
          var items = extraButton.split('\/')
          var name = items[items.length - 1]
          var bt = `<p style="float: left"><a style="text-decoration: underline; cursor: pointer" onclick="EditOnGithubPlugin.openFile(event, '${extraButton}')">${name}</a></p>`
          header = header.replace('<a/>', bt)
        }
        
        return header + html
      })

      hook.beforeEach(function(content) {
        extraButton = getButton(content)
        return content;
      });
    }
  }

  win.EditOnGithubPlugin.create = create
}) (window)