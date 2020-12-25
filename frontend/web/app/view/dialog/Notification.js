/*
 * Copyright 2017 - 2018 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 - 2018 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Geontrack.view.dialog.Notification', {
    extend: 'Geontrack.view.dialog.BaseEdit',

    requires: [
        'Geontrack.view.ClearableComboBox',
        'Geontrack.view.dialog.NotificationController'
    ],

    controller: 'notification',
    title: Strings.sharedNotification,

    items: {
        xtype: 'form',
        items: [{
            xtype: 'fieldset',
            title: Strings.sharedRequired,
            items: [{
                xtype: 'combobox',
                name: 'type',
                fieldLabel: Strings.sharedType,
                store: 'AllNotificationTypes',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'type',
                editable: false,
                allowBlank: false,
                listeners: {
                    change: 'onTypeChange'
                }
            }, {
                xtype: 'checkboxfield',
                inputValue: true,
                uncheckedValue: false,
                name: 'always',
                fieldLabel: Strings.notificationAlways
            }, {
                xtype: 'tagfield',
                reference: 'alarmsField',
                fieldLabel: Strings.sharedAlarms,
                maxWidth: Geontrack.Style.formFieldWidth,
                store: 'AlarmTypes',
                valueField: 'key',
                displayField: 'name',
                queryMode: 'local',
                hidden: true,
                listeners: {
                    beforerender: 'onAlarmsLoad',
                    change: 'onAlarmsChange'
                }
            }, {
                xtype: 'tagfield',
                fieldLabel: Strings.notificationNotificators,
                name: 'notificators',
                maxWidth: Geontrack.Style.formFieldWidth,
                store: 'AllNotificators',
                valueField: 'type',
                displayField: 'name',
                queryMode: 'local'
            }]
        }, {
            xtype: 'fieldset',
            title: Strings.sharedExtra,
            collapsible: true,
            collapsed: true,
            items: [{
                xtype: 'clearableComboBox',
                reference: 'calendarCombo',
                name: 'calendarId',
                store: 'Calendars',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                fieldLabel: Strings.sharedCalendar
            }]
        }]
    }
});
