# aurora-convert

A utility to convert a testing dataset of notes to actual aurora notes.

# To use:
From within this folder:
```
NODE_ENV={my_env} babel-node convert.js PATH-TO-DATASET
```

For example:
```
NODE_ENV=development babel-node convert.js our_small_dataset.json
```

This will add all of the notes in the dataset to your `~/.aurora/dev` folder.
To save notes to a different folder, use a different `NODE_ENV`. Then use a
different `npm run ENV` command to get those notes.

To get ride of these notes, run `ENV=<env> npm run db-reset` and then delete the `.aurora/<env>` folder.

Each note in the dataset must have attribute(s):
- `text`
