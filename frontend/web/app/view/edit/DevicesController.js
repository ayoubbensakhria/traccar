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

Ext.define('Geontrack.view.edit.DevicesController', {
    extend: 'Geontrack.view.edit.ToolbarController',
    alias: 'controller.devices',

    requires: [
        'Geontrack.view.dialog.SendCommand',
        'Geontrack.view.dialog.Device',
        'Geontrack.view.permissions.Geofences',
        'Geontrack.view.permissions.ComputedAttributes',
        'Geontrack.view.permissions.Drivers',
        'Geontrack.view.permissions.SavedCommands',
        'Geontrack.view.BaseWindow',
        'Geontrack.model.Device',
        'Geontrack.model.Command'
    ],

    config: {
        listen: {
            controller: {
                '*': {
                    selectreport: 'deselectDevice',
                    selectevent: 'deselectDevice'
                },
                'root': {
                    selectdevice: 'selectDevice'
                },
                'map': {
                    selectdevice: 'selectDevice',
                    deselectfeature: 'deselectFeature'
                }
            },
            store: {
                '#Devices': {
                    update: 'onUpdateDevice'
                }
            }
        }
    },

    objectModel: 'Geontrack.model.Device',
    objectDialog: 'Geontrack.view.dialog.Device',
    removeTitle: Strings.sharedDevice,

    init: function () {
        var self = this, readonly, deviceReadonly;
        deviceReadonly = Geontrack.app.getPreference('deviceReadonly', false) && !Geontrack.app.getUser().get('administrator');
        readonly = Geontrack.app.getPreference('readonly', false) && !Geontrack.app.getUser().get('administrator');
        this.lookupReference('toolbarAddButton').setDisabled(readonly || deviceReadonly);
        this.lookupReference('toolbarDeviceMenu').setHidden(readonly || deviceReadonly);

        setInterval(function () {
            self.getView().getView().refresh();
        }, Geontrack.Style.refreshPeriod);
    },

    onCommandClick: function () {
        var device, deviceId, dialog, typesStore, commandsStore;
        device = this.getView().getSelectionModel().getSelection()[0];
        deviceId = device.get('id');

        dialog = Ext.create('Geontrack.view.dialog.SendCommand');
        dialog.deviceId = deviceId;

        commandsStore = dialog.lookupReference('commandsComboBox').getStore();
        commandsStore.getProxy().setExtraParam('deviceId', deviceId);
        if (!Geontrack.app.getPreference('limitCommands', false)) {
            commandsStore.add({
                id: 0,
                description: Strings.sharedNew
            });
        }
        commandsStore.load({
            addRecords: true
        });

        typesStore = dialog.lookupReference('commandType').getStore();
        typesStore.getProxy().setExtraParam('deviceId', deviceId);
        typesStore.load();

        dialog.show();
    },

    updateButtons: function (selected) {
        var readonly, deviceReadonly, empty, deviceMenu;
        deviceReadonly = Geontrack.app.getPreference('deviceReadonly', false) && !Geontrack.app.getUser().get('administrator');
        readonly = Geontrack.app.getPreference('readonly', false) && !Geontrack.app.getUser().get('administrator');
        empty = selected.length === 0;
        this.lookupReference('toolbarEditButton').setDisabled(empty || readonly || deviceReadonly);
        this.lookupReference('toolbarRemoveButton').setDisabled(empty || readonly || deviceReadonly);
        deviceMenu = this.lookupReference('toolbarDeviceMenu');
        deviceMenu.device = empty ? null : selected[0];
        deviceMenu.setDisabled(empty);
        this.lookupReference('deviceCommandButton').setDisabled(empty || readonly);
    },

    onSelectionChange: function (el, records) {
        if (records && records.length) {
            this.updateButtons(records);
            this.fireEvent('selectdevice', records[0], true);
        }
    },

    selectDevice: function (device) {
        this.getView().getSelectionModel().select([device], false, true);
        this.updateButtons(this.getView().getSelectionModel().getSelected().items);
        this.getView().getView().focusRow(device);
    },

    deselectDevice: function (object) {
        if (object) {
            this.deselectFeature();
        }
    },

    onUpdateDevice: function () {
        this.updateButtons(this.getView().getSelectionModel().getSelected().items);
    },

    deselectFeature: function () {
        this.getView().getSelectionModel().deselectAll();
    }
});
