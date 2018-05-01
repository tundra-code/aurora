import React from "react";
import { connect } from "react-redux";
import TagItem from "./TagItem.js";
import { noteDictToArray } from "../note/util";
import { allNotes } from "../../redux/selectors";
import styled from "styled-components";


const Container = styled.div`
  overflow-y: auto;
  flex: 2;
`;

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const noteObjectList = noteDictToArray(this.props.allNotes);
    const  set = new Set();
    for (const note of noteObjectList) {
      for(const tag of note.getTags()){
        set.add(tag);
      }
    }
    
    const tagList = [];
    for(const tag of set){
      tagList.push(<TagItem key={tag.uuid} tag={tag.value}/>);
    }

    return (
      <Container>
         {tagList}
      </Container>
    );
  }
}

TagList.propTypes = {};

const mapStateToProps = state => {
  return {
    allNotes: allNotes(state)
  };
};

export default connect(mapStateToProps)(TagList);
