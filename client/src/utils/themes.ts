export class Themes {
  static day = {
    background_high: '#fff',
    background_med: '#e2e2e2',
    background_low: '#cdcdcd',
    foreground_high: '#ccc',
    foreground_med: '#777',
    foreground_low: '#303030',
    border_high: '#d9d9d9',
    border_low: '#a6a6a6',
    accent: '#f27280',
  };

  static night = {
    background_high: '#1f1f1f',
    background_med: '#1b1b1b',
    background_low: '#2c2c2c',
    foreground_high: '#D2D2D2',
    foreground_med: '#4B7676',
    foreground_low: '#D2D2D2',
    border_high: '#2d2d2d',
    border_low: '#2a2a2a',
    accent: '#f27280',
  };

  static init() {
    this.apply();
  };

  static apply() {
    const theme = localStorage.getItem('theme') || 'night';
    const palette = theme === 'night' ? this.night : this.day;
    const style = document.createElement('style');

    style.type = 'text/css';
    style.id = 'themeStyle';
    style.innerHTML = `
      :root {
        --background_high: ${palette.background_high};
        --background_med: ${palette.background_med};
        --background_low: ${palette.background_low};
        --foreground_high: ${palette.foreground_high};
        --foreground_med: ${palette.foreground_med};
        --foreground_low: ${palette.foreground_low};
        --border_high: ${palette.border_high};
        --border_low: ${palette.border_low};
        --accent: ${palette.accent};
      }
    `;

    const el = document.getElementById(style.id);

    if (el) {
      el.innerHTML = style.innerHTML;
    } else {
      document.body.appendChild(style);
    }
  }

  static toggle() {
    const theme = localStorage.getItem('theme') || 'night';

    if (theme === 'night') {
      localStorage.setItem('theme', 'day');
    } else {
      localStorage.setItem('theme', 'night');
    }

    this.apply();
  }
};
