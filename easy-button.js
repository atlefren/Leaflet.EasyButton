/*global L:false */

'use strict';

L.Control.EasyButtons = L.Control.extend({

    options: {
        position: 'topleft',
        title: '',
        icon: 'fa-circle-o'
    },

    initialize: function (callback, options) {
        L.setOptions(this, options);
        this.callback = callback;
    },

    onAdd: function () {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-bar-part', container);
        this._addImage();
        this.link.href = '#';

        L.DomEvent.on(this.link, 'click', this._click, this);
        this.link.title = this.options.title;

        return container;
    },

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        if (typeof this.callback === 'function') {
            this.callback();
        } else {
            throw new Error('no function selected');
        }
    },

    _addImage: function () {
        var extraClasses = this.options.icon.lastIndexOf('fa', 0) === 0 ? ' fa fa-lg' : ' glyphicon';

        var icon = L.DomUtil.create('i', this.options.icon + extraClasses, this.link);
        icon.id = this.options.id;
    }
});

L.easyButton = function (map, callback, options) {
    var newControl = new L.Control.EasyButtons(callback, options);

    if (map && map !== '') {
        map.addControl(newControl);
    }
    return newControl;
};
