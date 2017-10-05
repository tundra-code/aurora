# aurora-persist

A colleciton of strategies for persisting user data. (ie: saving, deleting, loading).

General strategy looks like this:

``` js 
const myStrat = {
    save: someSavefunc,
    loadNotes: someLoadNotesFunc,
    deleteNote: someDeleteNoteFunc
}
``` 

## SUPER WARNING 
You can't import this module like other ones. You need to import the submodules instead. So if you want the `io` persistance module,
you'll need to import like this:

``` js
import ioPersist from "../aurora-persist/io";
```

This is to avoid issues where the browser tries to require `fs` and then crashes because the browser doesn't know what the file system is. 