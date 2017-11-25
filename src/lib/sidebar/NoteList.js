import React from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../redux/actions";
import NoteListItem from "./NoteListItem.js";
import { Menu, MenuCardList, MenuItem } from "../ui/Menu";
import { allNotes } from "../../redux/selectors";
import { noteDictToArray } from "../note/util";

const BumpedDownMenu = Menu.extend`
  padding-top: ${props => props.theme.spacing.header};
`;

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadNotes());
  }

  render() {
    const noteList = noteDictToArray(this.props.allNotes).map(note => (
      <NoteListItem key={note.uuid} note={note} />
    ));

    return (
      <BumpedDownMenu>
        <MenuItem active> 🔮 Untagged </MenuItem>
        <MenuCardList> {noteList} </MenuCardList>
      </BumpedDownMenu>
    );
  }
}

NoteList.propTypes = {};

const mapStateToProps = state => {
  return { allNotes: allNotes(state) };
};

export default connect(mapStateToProps)(NoteList);
