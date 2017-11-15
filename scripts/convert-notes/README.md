# aurora-convert

A utility to convert a testing dataset of notes to actual aurora notes.

# To use:
From within this folder:
```
babel-node convert.js PATH-TO-DATASET
```

For example:
```
babel-node convert.js our_small_dataset.json
```

This will add all of the notes in the dataset to your `~/.aurora/dev` folder.

To get ride of these notes, run `npm run db-reset -e <env>` and then delete the `.aurora/<env>` folder.

Each note in the dataset must have attribute(s):
- `text`
