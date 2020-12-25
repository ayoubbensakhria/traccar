/*
 * Copyright 2018 Anton Tananaev (anton@traccar.org)
 * Copyright 2018 Andrey Kunitsyn (andrey@traccar.org)
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

Ext.define('Geontrack.view.edit.MaintenancesController', {
    extend: 'Geontrack.view.edit.ToolbarController',
    alias: 'controller.maintenances',

    requires: [
        'Geontrack.view.dialog.Maintenance',
        'Geontrack.model.Maintenance'
    ],

    objectModel: 'Geontrack.model.Maintenance',
    objectDialog: 'Geontrack.view.dialog.Maintenance',
    removeTitle: Strings.sharedMaintenance
});
