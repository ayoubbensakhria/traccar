/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2016 - 2017 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Geontrack.view.edit.UsersController', {
    extend: 'Geontrack.view.edit.ToolbarController',
    alias: 'controller.users',

    requires: [
        'Geontrack.view.dialog.User',
        'Geontrack.view.permissions.Devices',
        'Geontrack.view.permissions.Groups',
        'Geontrack.view.permissions.Geofences',
        'Geontrack.view.permissions.Calendars',
        'Geontrack.view.permissions.Users',
        'Geontrack.view.permissions.ComputedAttributes',
        'Geontrack.view.permissions.Drivers',
        'Geontrack.view.permissions.SavedCommands',
        'Geontrack.view.permissions.Notifications',
        'Geontrack.view.permissions.Maintenances',
        'Geontrack.view.BaseWindow',
        'Geontrack.model.User'
    ],

    objectModel: 'Geontrack.model.User',
    objectDialog: 'Geontrack.view.dialog.User',
    removeTitle: Strings.settingsUser,

    init: function () {
        Ext.getStore('Users').load();
        this.lookupReference('userUsersButton').setHidden(!Geontrack.app.getUser().get('administrator'));
        this.lookupReference('userDriversButton').setHidden(
            Geontrack.app.getVehicleFeaturesDisabled() || Geontrack.app.getBooleanAttributePreference('ui.disableDrivers'));
        this.lookupReference('userAttributesButton').setHidden(
            Geontrack.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
        this.lookupReference('userCalendarsButton').setHidden(
            Geontrack.app.getBooleanAttributePreference('ui.disableCalendars'));
        this.lookupReference('userCommandsButton').setHidden(Geontrack.app.getPreference('limitCommands', false));
        this.lookupReference('userMaintenancesButton').setHidden(
            Geontrack.app.getVehicleFeaturesDisabled() || Geontrack.app.getBooleanAttributePreference('ui.disableMaintenance'));
    },

    onEditClick: function () {
        var dialog, user = this.getView().getSelectionModel().getSelection()[0];
        dialog = Ext.create('Geontrack.view.dialog.User', {
            selfEdit: user.get('id') === Geontrack.app.getUser().get('id')
        });
        dialog.down('form').loadRecord(user);
        dialog.show();
    },

    onAddClick: function () {
        var user, dialog;
        user = Ext.create('Geontrack.model.User');
        if (Geontrack.app.getUser().get('administrator')) {
            user.set('deviceLimit', -1);
        }
        if (Geontrack.app.getUser().get('expirationTime')) {
            user.set('expirationTime', Geontrack.app.getUser().get('expirationTime'));
        }
        dialog = Ext.create('Geontrack.view.dialog.User');
        dialog.down('form').loadRecord(user);
        dialog.show();
    },

    onDevicesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.getStore('AllGroups').load();
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.deviceTitle,
            items: {
                xtype: 'linkDevicesView',
                baseObjectName: 'userId',
                linkObjectName: 'deviceId',
                storeName: 'AllDevices',
                linkStoreName: 'Devices',
                baseObject: user.getId()
            }
        }).show();
    },

    onGroupsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.settingsGroups,
            items: {
                xtype: 'linkGroupsView',
                baseObjectName: 'userId',
                linkObjectName: 'groupId',
                storeName: 'AllGroups',
                linkStoreName: 'Groups',
                baseObject: user.getId()
            }
        }).show();
    },

    onGeofencesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'linkGeofencesView',
                baseObjectName: 'userId',
                linkObjectName: 'geofenceId',
                storeName: 'AllGeofences',
                linkStoreName: 'Geofences',
                baseObject: user.getId()
            }
        }).show();
    },

    onNotificationsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedNotifications,
            items: {
                xtype: 'linkNotificationsView',
                baseObjectName: 'userId',
                linkObjectName: 'notificationId',
                storeName: 'AllNotifications',
                linkStoreName: 'Notifications',
                baseObject: user.getId()
            }
        }).show();
    },

    onCalendarsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedCalendars,
            items: {
                xtype: 'linkCalendarsView',
                baseObjectName: 'userId',
                linkObjectName: 'calendarId',
                storeName: 'AllCalendars',
                linkStoreName: 'Calendars',
                baseObject: user.getId()
            }
        }).show();
    },

    onUsersClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.settingsUsers,
            items: {
                xtype: 'linkUsersView',
                baseObjectName: 'userId',
                linkObjectName: 'managedUserId',
                storeName: 'Users',
                baseObject: user.getId()
            }
        }).show();
    },

    onAttributesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'linkComputedAttributesView',
                baseObjectName: 'userId',
                linkObjectName: 'attributeId',
                storeName: 'AllComputedAttributes',
                linkStoreName: 'ComputedAttributes',
                baseObject: user.getId()
            }
        }).show();
    },

    onDriversClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'linkDriversView',
                baseObjectName: 'userId',
                linkObjectName: 'driverId',
                storeName: 'AllDrivers',
                linkStoreName: 'Drivers',
                baseObject: user.getId()
            }
        }).show();
    },

    onCommandsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedSavedCommands,
            items: {
                xtype: 'linkSavedCommandsView',
                baseObjectName: 'userId',
                linkObjectName: 'commandId',
                storeName: 'AllCommands',
                linkStoreName: 'Commands',
                baseObject: user.getId()
            }
        }).show();
    },

    onMaintenancesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedMaintenance,
            items: {
                xtype: 'linkMaintenancesView',
                baseObjectName: 'userId',
                linkObjectName: 'maintenanceId',
                storeName: 'AllMaintenances',
                linkStoreName: 'Maintenances',
                baseObject: user.getId()
            }
        }).show();
    },

    onSelectionChange: function (selection, selected) {
        var disabled = selected.length === 0;
        this.lookupReference('userDevicesButton').setDisabled(disabled);
        this.lookupReference('userGroupsButton').setDisabled(disabled);
        this.lookupReference('userGeofencesButton').setDisabled(disabled);
        this.lookupReference('userNotificationsButton').setDisabled(disabled);
        this.lookupReference('userCalendarsButton').setDisabled(disabled);
        this.lookupReference('userAttributesButton').setDisabled(disabled);
        this.lookupReference('userDriversButton').setDisabled(disabled);
        this.lookupReference('userCommandsButton').setDisabled(disabled);
        this.lookupReference('userMaintenancesButton').setDisabled(disabled);
        this.lookupReference('userUsersButton').setDisabled(disabled || selected[0].get('userLimit') === 0);
        this.callParent(arguments);
    }
});
