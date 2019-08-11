import React from 'react';
import FlipMove from 'react-flip-move';

import NoteItem from 'components/NoteItem/NoteItem';

import './NoteList.scss';
import { Note } from 'interfaces/interfaces';

type NoteListProps = {
  notes: Note[];
}

type NoteListState = {
}

export default class NoteList extends React.Component<NoteListProps, NoteListState> {
  render() {
    return (
      <FlipMove duration={150} easing="ease-out">
        {this.props.notes.map((note: Note, index: number) => (
          <NoteItem data={note} key={index}/>
        ))}
      </FlipMove>
    );
  }
}
