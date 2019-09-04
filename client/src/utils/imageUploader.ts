import axios from 'axios';

export class ImageUploader {
  static init(callback: any) {
    document.body.addEventListener('dragover', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    document.body.addEventListener('drop', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
      this.load(event, callback);
    });
  }

  static load(event: DragEvent, callback: any) {
    if (event === null || event.dataTransfer === null) { return; }

    const file = event.dataTransfer.files[0];
    const imageTypes = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg'];
    const reader = new FileReader();

    if (!file || !imageTypes.includes(file.type)) {
      return;
    }

    reader.onload = (e: Event) => {
      if (reader.result === null) { return; }

      const blob = new Blob([reader.result], {
        type: file.type
      });

      const formData = new FormData();
      formData.append('image', blob);

      axios.post('api/images/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      }).then(() => {
        callback();
      });
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }
}
