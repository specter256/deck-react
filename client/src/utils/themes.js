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
        --b_dark: ${theme.b_dark};
        --b_medium: ${theme.b_medium};
        --b_light: ${theme.b_light};
        --f_dark: ${theme.f_dark};
        --f_medium: ${theme.f_medium};
        --f_light: ${theme.f_light};
        --accent_1: ${theme.accent_1};
        --accent_2: ${theme.accent_2};
        --accent_3: ${theme.accent_3};
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
      b_dark: svg.getElementById('b_dark').getAttribute('fill'),
      b_medium: svg.getElementById('b_medium').getAttribute('fill'),
      b_light: svg.getElementById('b_light').getAttribute('fill'),
      f_dark: svg.getElementById('f_dark').getAttribute('fill'),
      f_medium: svg.getElementById('f_medium').getAttribute('fill'),
      f_light: svg.getElementById('f_light').getAttribute('fill'),
      accent_1: svg.getElementById('accent_1').getAttribute('fill'),
      accent_2: svg.getElementById('accent_2').getAttribute('fill'),
      accent_3: svg.getElementById('accent_3').getAttribute('fill'),
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
