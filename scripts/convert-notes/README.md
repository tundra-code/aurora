# aurora-convert

A utility to convert a testing dataset of notes to actual aurora notes.

# To use:
From within this folder:
```
NODE_ENV={my_env} node bundle.js PATH-TO-DATASET
```

For example:
```
NODE_ENV=dev node bundle.js ~/Aurora/aurora-research/search/datasets/formatted_datasets/our_dataset.json
```

This will add all of the notes in the dataset to your `~/.dev_aurora` folder.
To save notes to a different folder, use a different `NODE_ENV`. Then use a
different `npm run ENV` command to get those notes.
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
