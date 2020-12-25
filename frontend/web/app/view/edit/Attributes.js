/*
 * Copyright 2016 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Geontrack.view.edit.Attributes', {
    extend: 'Geontrack.view.GridPanel',
    xtype: 'attributesView',

    requires: [
        'Geontrack.view.edit.AttributesController',
        'Geontrack.view.edit.Toolbar'
    ],

    controller: 'attributes',

    tbar: {
        xtype: 'editToolbar'
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Geontrack.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string',
            renderer: function (value) {
                var attribute;
                if (this.attributesStore) {
                    attribute = Ext.getStore(this.attributesStore).getById(value);
                }
                return attribute && attribute.get('name') || value;
            }
        }, {
            text: Strings.stateValue,
            dataIndex: 'value',
            renderer: function (value, metaData, record) {
                var attribute;
                if (this.attributesStore) {
                    attribute = Ext.getStore(this.attributesStore).getById(record.get('name'));
                }
                return Geontrack.AttributeFormatter.renderAttribute(value, attribute);
            }
        }]
    }
});
