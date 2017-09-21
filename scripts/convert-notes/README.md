# aurora-convert

A utility to convert a testing dataset of notes to actual aurora notes.

# To use:
From within this folder:
```
node bundle.js PATH-TO-DATASET
```

For example:
```
node bundle.js ~/Aurora/aurora-research/search/search_bench/resources/manual_dataset.json
```

This will add all of the notes in the dataset to your `~/.aurora` folder.
You can delete this folder if you want to get rid of these notes.

Each note in the dataset must have two attributes:
- `text`
- `uuid` (must be unique)

# To develop
To edit this script, simply update the code and the compile it by running:
```
webpack
```
from within this folder.
