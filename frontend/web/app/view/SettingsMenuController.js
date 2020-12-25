/*
 * Copyright 2015 - 2018 Anton Tananaev (anton@traccar.org)
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

Ext.define('Geontrack.view.SettingsMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings',

    requires: [
        'Geontrack.view.dialog.LoginController',
        'Geontrack.view.dialog.User',
        'Geontrack.view.dialog.Server',
        'Geontrack.view.edit.Users',
        'Geontrack.view.edit.Groups',
        'Geontrack.view.edit.Geofences',
        'Geontrack.view.edit.Drivers',
        'Geontrack.view.edit.Notifications',
        'Geontrack.view.edit.ComputedAttributes',
        'Geontrack.view.Statistics',
        'Geontrack.view.edit.Calendars',
        'Geontrack.view.edit.SavedCommands',
        'Geontrack.view.edit.Maintenances',
        'Geontrack.view.BaseWindow'
    ],

    init: function () {
        var admin, manager, readonly;
        admin = Geontrack.app.getUser().get('administrator');
        manager = Geontrack.app.getUser().get('userLimit') !== 0;
        readonly = Geontrack.app.getPreference('readonly', false);
        if (admin) {
            this.lookupReference('settingsServerButton').setHidden(false);
            this.lookupReference('settingsStatisticsButton').setHidden(false);
            this.lookupReference('settingsComputedAttributesButton').setHidden(
                Geontrack.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
        }
        if (admin || manager) {
            this.lookupReference('settingsUsersButton').setHidden(false);
        }
        if (admin || !readonly) {
            this.lookupReference('settingsUserButton').setHidden(false);
            this.lookupReference('settingsGroupsButton').setHidden(false);
            this.lookupReference('settingsGeofencesButton').setHidden(false);
            this.lookupReference('settingsNotificationsButton').setHidden(false);
            this.lookupReference('settingsCalendarsButton').setHidden(
                Geontrack.app.getBooleanAttributePreference('ui.disableCalendars'));
            this.lookupReference('settingsDriversButton').setHidden(
                Geontrack.app.getVehicleFeaturesDisabled() || Geontrack.app.getBooleanAttributePreference('ui.disableDrivers'));
            this.lookupReference('settingsCommandsButton').setHidden(Geontrack.app.getPreference('limitCommands', false));
            this.lookupReference('settingsMaintenancesButton').setHidden(
                Geontrack.app.getVehicleFeaturesDisabled() || Geontrack.app.getBooleanAttributePreference('ui.disableMaintenance'));
        }
    },

    onUserClick: function () {
        var dialog = Ext.create('Geontrack.view.dialog.User', {
            selfEdit: true
        });
        dialog.down('form').loadRecord(Geontrack.app.getUser());
        dialog.lookupReference('testNotificationButton').setHidden(false);
        dialog.show();
    },

    onGroupsClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.settingsGroups,
            items: {
                xtype: 'groupsView'
            }
        }).show();
    },

    onGeofencesClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'geofencesView'
            }
        }).show();
    },

    onServerClick: function () {
        var dialog = Ext.create('Geontrack.view.dialog.Server');
        dialog.down('form').loadRecord(Geontrack.app.getServer());
        dialog.show();
    },

    onUsersClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.settingsUsers,
            items: {
                xtype: 'usersView'
            }
        }).show();
    },

    onNotificationsClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedNotifications,
            items: {
                xtype: 'notificationsView'
            }
        }).show();
    },

    onComputedAttributesClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'computedAttributesView'
            }
        }).show();
    },

    onStatisticsClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.statisticsTitle,
            items: {
                xtype: 'statisticsView'
            }
        }).show();
    },

    onCalendarsClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedCalendars,
            items: {
                xtype: 'calendarsView'
            }
        }).show();
    },

    onDriversClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'driversView'
            }
        }).show();
    },

    onCommandsClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedSavedCommands,
            items: {
                xtype: 'savedCommandsView'
            }
        }).show();
    },

    onMaintenancesClick: function () {
        Ext.create('Geontrack.view.BaseWindow', {
            title: Strings.sharedMaintenance,
            items: {
                xtype: 'maintenancesView'
            }
        }).show();
    },

    onLogoutClick: function () {
        Ext.create('Geontrack.view.dialog.LoginController').logout();
    }
});
