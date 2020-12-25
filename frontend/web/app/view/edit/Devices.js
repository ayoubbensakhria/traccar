/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
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

Ext.define('Geontrack.view.edit.Devices', {
    extend: 'Geontrack.view.GridPanel',
    xtype: 'devicesView',

    requires: [
        'Geontrack.AttributeFormatter',
        'Geontrack.view.edit.DevicesController',
        'Geontrack.view.ArrayListFilter',
        'Geontrack.view.DeviceMenu'
    ],

    controller: 'devices',

    store: 'VisibleDevices',

    stateful: true,
    stateId: 'devices-grid',

    tbar: {
        componentCls: 'toolbar-header-style',
        defaults: {
            xtype: 'button',
            disabled: true,
            tooltipType: 'title'
        },
        items: [{
            xtype: 'tbtext',
            html: Strings.deviceTitle,
            baseCls: 'x-panel-header-title-default'
        }, {
            xtype: 'tbfill',
            disabled: false
        }, {
            handler: 'onAddClick',
            reference: 'toolbarAddButton',
            glyph: 'xf067@FontAwesome',
            tooltip: Strings.sharedAdd
        }, {
            handler: 'onEditClick',
            reference: 'toolbarEditButton',
            glyph: 'xf040@FontAwesome',
            tooltip: Strings.sharedEdit
        }, {
            handler: 'onRemoveClick',
            reference: 'toolbarRemoveButton',
            glyph: 'xf00d@FontAwesome',
            tooltip: Strings.sharedRemove
        }, {
            handler: 'onCommandClick',
            reference: 'deviceCommandButton',
            glyph: 'xf093@FontAwesome',
            tooltip: Strings.deviceCommand
        }, {
            xtype: 'deviceMenu',
            reference: 'toolbarDeviceMenu',
            enableToggle: false
        }]
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    viewConfig: {
        enableTextSelection: true,
        getRowClass: function (record) {
            var result = '', status = record.get('status');
            if (record.get('disabled')) {
                result = 'view-item-disabled ';
            }
            if (status) {
                result += Ext.getStore('DeviceStatuses').getById(status).get('color');
            }
            return result;
        }
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Geontrack.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string'
        }, {
            text: Strings.deviceIdentifier,
            dataIndex: 'uniqueId',
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.sharedPhone,
            dataIndex: 'phone',
            hidden: true
        }, {
            text: Strings.deviceModel,
            dataIndex: 'model',
            hidden: true
        }, {
            text: Strings.deviceContact,
            dataIndex: 'contact',
            hidden: true
        }, {
            text: Strings.groupDialog,
            dataIndex: 'groupId',
            hidden: true,
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'Groups'
            },
            renderer: Geontrack.AttributeFormatter.getFormatter('groupId')
        }, {
            text: Strings.sharedDisabled,
            dataIndex: 'disabled',
            renderer: Geontrack.AttributeFormatter.getFormatter('disabled'),
            hidden: true,
            filter: 'boolean'
        }, {
            text: Strings.sharedGeofences,
            dataIndex: 'geofenceIds',
            hidden: true,
            filter: {
                type: 'arraylist',
                idField: 'id',
                labelField: 'name',
                store: 'Geofences'
            },
            renderer: function (value) {
                var i, name, result = '';
                if (Ext.isArray(value)) {
                    for (i = 0; i < value.length; i++) {
                        name = Geontrack.AttributeFormatter.geofenceIdFormatter(value[i]);
                        if (name) {
                            result += name + (i < value.length - 1 ? ', ' : '');
                        }
                    }
                }
                return result;
            }
        }, {
            text: Strings.deviceStatus,
            dataIndex: 'status',
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'DeviceStatuses'
            },
            renderer: function (value) {
                var status;
                if (value) {
                    status = Ext.getStore('DeviceStatuses').getById(value);
                    if (status) {
                        return status.get('name');
                    }
                }
                return null;
            }
        }, {
            text: Strings.deviceLastUpdate,
            dataIndex: 'lastUpdate',
            renderer: Geontrack.AttributeFormatter.getFormatter('lastUpdate')
        }]
    }
});
