export interface Note {
  id: number,
  text: string,
  create_date: Date,
  update_date: Date,
  tags: Tag[],
}

export interface Tag {
  id: number,
  name: string,
}

export interface Image {
  id: number,
  filename: string,
  create_date: string,
}
