## What is webdav?



According to [wikipedia](https://en.wikipedia.org/wiki/WebDAV)

>  "Web Distributed Authoring and Versioning (WebDAV) is an extension of the Hypertext Transfer Protocol (HTTP) that allows clients to perform remote Web content authoring operations. WebDAV is defined in RFC 4918 by a working group of the Internet Engineering Task Force.
>
>  The WebDAV protocol provides a framework for users to create, change and move documents on a server. The most important features of the WebDAV protocol include the maintenance of properties about an author or modification date, namespace management, collections, and overwrite protection"



## Webdav Methods

Webdav extends HTTP and apart from the usual HTTP methods, there are some additional webdav specific methods as listed below.

- PROPFIND


In WebDAV, documents can have properties, and clients can use this method to retrieve those properties.

- MKCOL


WebDAV lets you group documents into collections, and clients can use this method to create a new collection.

- MOVE


This is similar to COPY, but the server is expected to delete the source resource as part of this operation.

- UNLOCK


Clients can use this method to unlock a previously locked resource.

## Angular 4+ HttpClient with webdav

New angular HttpClient library supports custom methods (like 'MKCOL', 'PROPFIND', etc.) Let's see how we can invoke custom http methods using angular httpclient library.

```typescript
/**
* Get properties of a certain directory or file
* @param {string} directoryName
* @returns {Observable<any>}
*/
public getProperties(directoryName: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic xxxxxxxxxxxx', // if your server supports authentication
      'Depth': '100', // depth of the directory tree to be fetched 1 = fetch only the files inside root directory
    });
    return this.http.request('PROPFIND', this.WEBDAV_BASE + '/' + directoryName , { headers: headers , responseType: 'text'})
      .map(res => {
        // your code goes here, play around with 'res'
      })
      .catch(error => error);
  }

/**
* Create collection
* @param {string} directoryName
* @returns {Observable<any>}
*/
public createDirectory(directoryName: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Basic xxxxxxxxxxxx' });
    return this.http.request('MKCOL', this.WEBDAV_BASE + '/' + directoryName, { headers: headers , responseType: 'text'})
      .map(res => res)
      .catch(error => error);
  }
```


This is just a very basic introduction to webdav and how to invoke custom http methods using new angular httpclient library. Feel free to comment if you have any questions.

If you are facing the CORS issues you can implement a custom filter like this



<script src="https://gist.github.com/YasithLokuge/045b050fb161ac65d9e6640b16602b85.js"></script>


<script src="D:\TempDatei\markdown_files\hack.js">
</script>

