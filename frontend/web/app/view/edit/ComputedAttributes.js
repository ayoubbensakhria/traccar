/*
 * Copyright 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Geontrack.view.edit.ComputedAttributes', {
    extend: 'Geontrack.view.GridPanel',
    xtype: 'computedAttributesView',

    requires: [
        'Geontrack.view.edit.ComputedAttributesController',
        'Geontrack.view.edit.Toolbar'
    ],

    controller: 'computedAttributes',
    store: 'ComputedAttributes',

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
            text: Strings.sharedDescription,
            dataIndex: 'description',
            filter: 'string'
        }, {
            text: Strings.sharedAttribute,
            dataIndex: 'attribute',
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'PositionAttributes'
            },
            renderer: function (value) {
                return Ext.getStore('PositionAttributes').getAttributeName(value);
            }
        }, {
            text: Strings.sharedExpression,
            dataIndex: 'expression'
        }, {
            text: Strings.sharedType,
            dataIndex: 'type',
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'AttributeValueTypes'
            },
            renderer: function (value) {
                var type = Ext.getStore('AttributeValueTypes').getById(value);
                if (type) {
                    return type.get('name');
                } else {
                    return value;
                }
            }
        }]
    }
});
