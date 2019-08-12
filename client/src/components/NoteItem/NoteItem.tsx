import React from 'react';
import { MdCheck, MdClose, MdDelete } from "react-icons/md";

import './NoteItem.scss';

type NoteItemProps = {
  fetchNotes: () => Promise<void>;
  delNote: (id: number) => void;
  data: any;
}

type NoteItemState = {
  showDelConfirm: boolean;
}

export default class NoteItem  extends React.Component<NoteItemProps, NoteItemState> {
  constructor(props: NoteItemProps) {
    super(props);

    this.state = {
      showDelConfirm: false
    };

    this.onShowDelConfirm = this.onShowDelConfirm.bind(this);
    this.onHideDelConfirm = this.onHideDelConfirm.bind(this);
    this.onDelNote = this.onDelNote.bind(this);
  }

  onDelNote() {
    this.props.delNote(this.props.data.id);
    this.setState({ showDelConfirm: false });
  }

  onShowDelConfirm() {
    this.setState({ showDelConfirm: true });
  }

  onHideDelConfirm() {
    this.setState({ showDelConfirm: false });
  }

  render() {
    const delIcon =
      <div className="item-del">
        <MdDelete onClick={this.onShowDelConfirm}/>
      </div>

    const delConfirmIcons =
      <div className="item-del-confirm">
        <MdCheck onClick={this.onDelNote}/>
        <MdClose onClick={this.onHideDelConfirm}/>
      </div>

    return (
      <div className="item-container">
        <div className="item-left-col">
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
        <div className="item-right-col">
          {this.state.showDelConfirm === false ? delIcon : null}
          {this.state.showDelConfirm === true ? delConfirmIcons : null}
        </div>
      </div>
    );
  }
}
