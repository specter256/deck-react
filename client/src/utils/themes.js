module.exports = {
  init() {
    document.body.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });

    document.body.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      module.exports.load(event);
    });

    module.exports.apply();
  },

  apply() {
    let theme = localStorage.getItem('theme');

    if (!theme || !module.exports.isJSON(theme)) {
      return;
    }

    theme = JSON.parse(theme);
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
  },

  load(event) {
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const json = module.exports.parse(e.target.result);
      localStorage.setItem('theme', JSON.stringify(json));
      module.exports.apply();
    };

    if (file) {
      reader.readAsText(file);
    }
  },

  parse(str) {
    const parser = new DOMParser();
    const svg = parser.parseFromString(str, 'image/svg+xml');
    const json = {
      p1_primary: svg.getElementById('p1_primary').getAttribute('fill'),
      p1_secondary: svg.getElementById('p1_secondary').getAttribute('fill'),
      p1_borders: svg.getElementById('p1_borders').getAttribute('fill'),
      p1_accent: svg.getElementById('p1_accent').getAttribute('fill'),
      p2_primary: svg.getElementById('p2_primary').getAttribute('fill'),
      p2_secondary: svg.getElementById('p2_secondary').getAttribute('fill'),
      p2_borders: svg.getElementById('p2_borders').getAttribute('fill'),
      p2_accent: svg.getElementById('p2_accent').getAttribute('fill'),
      p3_primary: svg.getElementById('p3_primary').getAttribute('fill'),
      p3_secondary: svg.getElementById('p3_secondary').getAttribute('fill'),
      p3_borders: svg.getElementById('p3_borders').getAttribute('fill'),
      p3_accent: svg.getElementById('p3_accent').getAttribute('fill'),
      text_1: svg.getElementById('text_1').getAttribute('fill'),
      text_2: svg.getElementById('text_2').getAttribute('fill'),
      text_3: svg.getElementById('text_3').getAttribute('fill'),
      text_4: svg.getElementById('text_4').getAttribute('fill'),
    };

    return json;
  },

  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
};
