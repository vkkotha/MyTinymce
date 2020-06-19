let tinymceLoaded = false;
fallbackFonts = {
  disabled: false,
  selectToggle: true,
  options: [
    {
      value: 'Helvetica, Arial, sans-serif;',
      content: 'Helvetica, Arial, sans-serif;',
    },
    {
      value: 'Arial, Helvetica, sans-serif;',
      content: 'Arial, Helvetica, sans-serif;',
    },
    {
      value: `'Arial Black', Gadget, sans-serif;`,
      content: `'Arial Black', Gadget, sans-serif;`,
    },
    {
      value: `'Courier New', Courier, monospace`,
      content: `'Courier New', Courier, monospace`,
    },
    {
      value: 'Georgia, Times, serif;',
      content: 'Georgia, Times, serif;',
    },
    {
      value: 'Impact, Charcoal, sans-serif;',
      content: 'Impact, Charcoal, sans-serif;',
    },
    {
      value: `'Palatino', Palatino Linotype Georgia, serif;`,
      content: `'Palatino', Palatino Linotype Georgia, serif;`,
    },
    {
      value: 'Tahoma, Geneva, sans-serif;',
      content: 'Tahoma, Geneva, sans-serif;',
    },
    {
      value: `'Times New Roman', Times, serif;`,
      content: `'Times New Roman', Times, serif;`,
    },
    {
      value: `'Trebuchet MS', Helvetica, sans-serif;`,
      content: `'Trebuchet MS', Helvetica, sans-serif;`,
    },
    {
      value: 'Verdana, Geneva, sens-serif;',
      content: 'Verdana, Geneva, sens-serif;',
    }
  ],
  selected: {
    content: 'Select an option',
  },
  name: 'select1',
  id: '1',
  // fonts: `Helvetica, Arial, sans-serif = Helvetica, Arial, sans-serif;
  //     Arial, Helvetica, sans-serif= Arial, Helvetica, sans-serif;
  //     'Arial Black', Gadget, sans-serif = 'Arial Black', Gadget, sans-serif;
  //     'Courier New', Courier, monospace = 'Courier New', Courier, monospace;
  //     Georgia, Times, serif = Georgia, Times, serif;
  //     Impact, Charcoal, sans-serif = Impact, Charcoal, sans-serif;
  //     'Palatino', Palatino Linotype Georgia, serif = 'Palatino', Palatino Linotype Georgia, serif;
  //     Tahoma, Geneva, sans-serif = Tahoma, Geneva, sans-serif;
  //     'Times New Roman', Times, serif = 'Times New Roman', Times, serif;
  //     'Trebuchet MS', Helvetica, sans-serif = 'Trebuchet MS', Helvetica, sans-serif;
  //     Verdana, Geneva, sens-serif = Verdana, Geneva, sens-serif;
  //   `,
  fonts: `Helvetica, Arial, sans-serif = Helvetica, Arial, sans-serif;
    Arial, Helvetica, sans-serif= Arial, Helvetica, sans-serif;
    'Arial Black', Gadget, sans-serif = 'Arial Black', Gadget, sans-serif;
    'Courier New', Courier, monospace = 'Courier New', Courier, monospace;
    Georgia, Times, serif = Georgia, Times, serif;
    Impact, Charcoal, sans-serif = Impact, Charcoal, sans-serif;
    'Palatino', Palatino Linotype Georgia, serif = 'Palatino', Palatino Linotype Georgia, serif;
    Tahoma, Geneva, sans-serif = Tahoma, Geneva, sans-serif;
    'Times New Roman', Times, serif = 'Times New Roman', Times, serif;
    'Trebuchet MS', Helvetica, sans-serif = 'Trebuchet MS', Helvetica, sans-serif;
    'Sriracha', cursive, Helvetica, sans-serif = 'Sriracha', cursive, Helvetica, sans-serif;
    'Roboto', sans-serif = 'Roboto', sans-serif;
    `,
  external_fonts: ''
};
// Verdana, Geneva, sens-serif = Verdana, Geneva, sens-serif;

function processExternalFonts(externalFonts = '') {
  if (externalFonts.trim().length === 0) {
    return '';
  }
  externalFonts = externalFonts.replace(/;=/g, '=');
  const fonts = externalFonts.split(';');
  return fonts.filter(font => font.trim() !== '')
    .map(font => {
      font = font.trim();
      const fontsMap = font.split('=');

      const splits = fontsMap[0].split('|');
      if (splits[1]) {
        const fontNameAndWeight = fontsMap[0];
        const fontFamilySplits = fontsMap[1].split('|');
        const fontFamily = fontFamilySplits.length === 2 ? fontFamilySplits[1] : fontFamilySplits[0];
        const fontAndWeightDisplayText = fontNameAndWeight.replace('|', '-');
        const uniqueFontAndWeightText = fontNameAndWeight.trim().replace(/\s+\|\s+/g, '__');
        font = fontAndWeightDisplayText + '=' + uniqueFontAndWeightText + ',' + fontFamily;
      }
      return font;
    }).join(';');
}

function getFontFormats() {
  return fallbackFonts.fonts.trim()
    + processExternalFonts(fallbackFonts.external_fonts).replace(/;=/g, '=').trim();
}

function getEditorConfig(simple=true) {
  let plugins = [
    'charmap',
    'lists',
    'colorpicker',
    'textcolor',
    'image',
    'code'
  ];
  let toolbar = 'fontselect | fontsize | forecolor | bold | italic | underline | strikethrough | subscript | superscript | charmap | personalizationDropdown | image | code';
  let selector = '[module_guid] [cbn-editable="richtext"][richtext-mode="simple"] div[contenteditable="true"]';

  if (!simple) {
    plugins.push('link');
    toolbar = 'fontselect | fontsize | forecolor | bold | italic | underline | strikethrough | subscript | superscript | link | unlink | charmap | personalizationDropdown | image';
    selector = '[module_guid] [cbn-editable="richtext"]:not([richtext-mode="simple"]) div[contenteditable="true"]';
  }

  const config = {
    // selector: selector,
    menubar: false,
    inline: true,
    plugins: plugins,
    image_list: [{title: 'right arrow', value: 'https://www.svgrepo.com/show/221989/right-arrow-next.svg'}],
    target_list: false,
    link_title: false,
    fixed_toolbar_container: '#tinymce-toolbar',
    toolbar: toolbar,
    style_formats_merge: true,
    valid_styles: {
      '*': 'font-size,font-family,color,text-decoration,text-align,font-weight,line-height,margin'
    },
    content_css: [
      'http://fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      'https://fonts.googleapis.com/css2?family=Sriracha',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;700'
    ],
    content_style: 'sup { vertical-align: text-top .6em; line-height: .6em; font-size: 60%; top :.1em; }, div { z-index : 1}, .tox-notifications-container { display: none !important}',
    fontsize_formats: '6pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 22pt 24pt 26pt 28pt 30pt 32pt 36pt 48pt 60pt 72pt',
    font_formats: getFontFormats(),
    forced_root_block: '',
    paste_data_images: false,
    convert_urls: false,
    setup: function (editor) {
      const getSpecifiedFontProp = function (propName, rootElm, elm) {
        while (elm !== rootElm) {
          if (elm.style[propName]) {
            return elm.style[propName];
          }
          elm = elm.parentNode;
        }
        return 0;
      }
    
      const getComputedFontProp = (propName, elm) => {
        return tinyMCE.DOM.getStyle(elm, propName, true)
      }
    
      const getFontSize = (rootElm, elm) => {
        return getSpecifiedFontProp('fontSize', rootElm, elm) || getComputedFontProp('fontSize', elm)
      }
    
      const createFontSizeListBoxChangeHandler = () => {
        return function () {
          editor.on('nodeChange', (e) => {
            let px = getFontSize(editor.getBody(), e.element);
            this.value(px);
            
            if (!px) {
              this.$el.find('.mce-ico').show();
              this.text('');
            } else {
              this.$el.find('.mce-ico').hide();
              this.text(px);
            }
          });
        }
      };

      const fontSizes = '8px 10px 11px 12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 38px 42px 48px 72px'.split(' ')
      const fontItems = fontSizes.map(size => ({
        text: size,
        value: size
      }));
      editor.on('Change', function(e) {
        $(editor.contentDocument).find('span').css('line-height', '120%');
      }),
      editor.addButton('fontsize', {
        type: 'combobox',
        placeholder: 'Font size',
        tooltip: 'Font size',
        values: fontItems,
        onPostRender: createFontSizeListBoxChangeHandler(fontItems),
        onselect: function (e) {
          editor.execCommand('fontSize', false, this.value());
        },
        onfocusout: function (e) {
          if (this.value().length) {
            const fontSize = parseInt(this.value());
            if (fontSize >=6 && fontSize <= 500) {
              editor.execCommand('fontSize', false, fontSize + 'px');
            }
          }
        },
        onkeydown: function (e) {
          if ((e.key === 'Tab' || e.key === 'Enter') && (this.value().length)) {
            const fontSize = parseInt(this.value());
            if (fontSize >=6 && fontSize <= 500) {
              editor.execCommand('fontSize', false, fontSize + 'px');
            }
          }
        }
      });
    }
  };
  // console.log(config);
  return config;
}

function loadTinymce(){
  tinymce.init({
    select: '#tiny-editor'
  }).then(function() {
    tinymceLoaded = true;
  });
}

function showTiny(el, config) {
  if (tinymceLoaded) {
    let editorConfig = {...config};
    editorConfig.selector = "#" + el.id;
    // editorConfig.auto_focus = el.id;
    tinymce.init(editorConfig).then(function(eds) {
      if (eds.length > 0) {
        eds[0].fire('focusin');
        eds[0].selection.select(eds[0].getBody(), true);
        eds[0].selection.collapse(false);
      }
  });
  }
}

// initTiny('default', false);

// force load tinymce
$(document).ready(function() {
  loadTinymce();
});