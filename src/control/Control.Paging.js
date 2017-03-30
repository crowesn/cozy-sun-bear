import {Control} from './Control';
import {Reader} from '../reader/Reader';
import * as DomUtil from '../dom/DomUtil';
import * as DomEvent from '../dom/DomEvent';

var PageControl = Control.extend({
  onAdd: function(reader) {
    var className = this._className(),
        container = DomUtil.create('div', className),
        options = this.options;

    this._button  = this._createButton(options.html || options.label, options.label,
            className, container, this._action);

    return container;
  },

  _createButton: function (html, title, className, container, fn) {
    var link = DomUtil.create('a', className, container);
    link.innerHTML = html;
    link.href = '#';
    link.title = title;

    /*
     * Will force screen readers like VoiceOver to read this as "Zoom in - button"
     */
    link.setAttribute('role', 'button');
    link.setAttribute('aria-label', title);

    DomEvent.disableClickPropagation(link);
    DomEvent.on(link, 'click', DomEvent.stop);
    DomEvent.on(link, 'click', fn, this);
    // DomEvent.on(link, 'click', this._refocusOnMap, this);

    return link;
  },

  EOT: true
});

export var PagePrevious = PageControl.extend({
  options: {
    region: 'edge.left',
    direction: 'previous',
    label: 'Prevous Page'
  },

  _action: function(e) {
    this._reader.prev();
  }
});

export var PageNext = PageControl.extend({
  options: {
    region: 'edge.right',
    direction: 'next',
    label: 'Next Page'
  },

  _action: function(e) {
    this._reader.next();
  }
});

export var pageNext = function(options) {
  return new PageNext(options);
}

export var pagePrevious = function(options) {
  return new PagePrevious(options);
}