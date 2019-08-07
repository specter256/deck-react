import React from 'react';

import './NoteItem.scss';

type NoteItemProps = {
  data: any;
}

type NoteItemState = {
}

export default class NoteItem  extends React.Component<NoteItemProps, NoteItemState> {
  render() {
    return (
      <div className="item-container">
        <div className="item-text">
          {this.props.data.text}
        </div>
        <div className="item-update-date">
          {this.props.data.update_date}
        </div>
        <div className="item-tag">
          Tag
        </div>
      </div>
    );
  }
}
