# Editor modifiers
Editor Modifiers are functions that take a React editor component and return a modified React editor component. 

The basic structure is:

``` js 
const EditorWithSomethingNew = myModifier(Editor); 

// Now we can render it as:
const ToBeRendered = <EditorWithSomethingNew />;
```

They're really useful for applying functionality to different types of editors. They're pretty simple to understand but if you want to learn more, you can checkout [this react docs about Higher Ordered Components (HOC)](https://facebook.github.io/react/docs/higher-order-components.html).

## Examples

Want your editor wrapped in a card? Try using the `hasCard` modifier like so:

``` js 
import { Editor, modifiers } from "../aurora-editor";
const EditorWithCard = modifiers.hasCard(Editor);

// ... Somewhere render it or export your new component

const ToBeRenderered = <EditorWithCard onChange={this.onChange} editorState={this.props.editorState}/> 
```

Editors don't include typing by default and ask their parents to determine what should happen with on change. But you don't have to do that if you don't want to. Want to just have simple editing functionality? Try using `canType` to add basic typing functionality.

``` js
import { Editor, modifiers } from "../aurora-editor";
const EditorThatCanType = modifiers.canType(Editor);

// ... Somewhere render it or export your new component

const ToBeRenderered = <EditorThatCanType />; //Notice we don't need any props 
```

You can mix and match modifiers as much as you want. Though, note that the `canType` adds a basic state which might not play well with other modifiers that add state.

``` js 
import { Editor, modifiers } from "../aurora-editor";

// You can attach any functionality you want to any editor like this
const EditorWithCard = modifiers.hasCard(Editor);
const EditorWithCardThatCanType = modifiers.canType(EditorWithCard);
```