/*
 * Copyright 2016 - 2017 Anton Tananaev (anton@traccar.org)
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

Ext.define('Geontrack.view.edit.ComputedAttributesController', {
    extend: 'Geontrack.view.edit.ToolbarController',
    alias: 'controller.computedAttributes',

    requires: [
        'Geontrack.view.dialog.ComputedAttribute',
        'Geontrack.model.ComputedAttribute'
    ],

    objectModel: 'Geontrack.model.ComputedAttribute',
    objectDialog: 'Geontrack.view.dialog.ComputedAttribute',
    removeTitle: Strings.sharedComputedAttribute
});
