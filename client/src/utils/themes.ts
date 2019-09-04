export class Themes {
  static init() {
    document.body.addEventListener('dragover', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    document.body.addEventListener('drop', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
      this.load(event);
    });

    this.apply();
  };

  static apply() {
    let themeStr = localStorage.getItem('theme');

    if (!themeStr || !this.isJSON(themeStr)) { return; }

    const theme = JSON.parse(themeStr);

    if (theme === null) { return; }

    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'themeStyle';
    style.innerHTML = `
      :root {
        --p1_primary: ${theme.p1_primary};
        --p1_secondary: ${theme.p1_secondary};
        --p1_borders: ${theme.p1_borders};
        --p1_accent: ${theme.p1_accent};
        --p2_primary: ${theme.p2_primary};
        --p2_secondary: ${theme.p2_secondary};
        --p2_borders: ${theme.p2_borders};
        --p2_accent: ${theme.p2_accent};
        --p3_primary: ${theme.p3_primary};
        --p3_secondary: ${theme.p3_secondary};
        --p3_borders: ${theme.p3_borders};
        --p3_accent: ${theme.p3_accent};
        --text_1: ${theme.text_1};
        --text_2: ${theme.text_2};
        --text_3: ${theme.text_3};
        --text_4: ${theme.text_4};
      }
    `;

    const el = document.getElementById(style.id);

    if (el) {
      el.innerHTML = style.innerHTML;
    } else {
      document.body.appendChild(style);
    }
  }

  static load(event: DragEvent) {
    if (event === null || event.dataTransfer === null) { return; }

    const file = event.dataTransfer.files[0];

    if (!file || file.type !== 'image/svg+xml') {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const json = this.parse(reader.result);
      localStorage.setItem('theme', JSON.stringify(json));
      this.apply();
    };

    if (file) {
      reader.readAsText(file);
    }
  }

  static parse(str: any) {
    if (str === null) { return; }

    const parser = new DOMParser();
    const svg = parser.parseFromString(str, 'image/svg+xml');

    if (svg === null) { return; }

    const elements = [
      'p1_primary',
      'p1_secondary',
      'p1_borders',
      'p1_accent',
      'p2_primary',
      'p2_secondary',
      'p2_borders',
      'p2_accent',
      'p3_primary',
      'p3_secondary',
      'p3_borders',
      'p3_accent',
      'text_1',
      'text_2',
      'text_3',
      'text_4',
    ];

    const json: any = {};

    for (const el of elements) {
      const svgEl = svg.getElementById(el);

      if (svgEl) {
        json[el] = svgEl.getAttribute('fill');
      }
    }

    return json;
  }

  static isJSON(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }
};
