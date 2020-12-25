/*
 * Copyright 2015 Anton Tananaev (anton@traccar.org)
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

Ext.define('Geontrack.view.BaseWindow', {
    extend: 'Ext.window.Window',

    width: Geontrack.Style.windowWidth,
    height: Geontrack.Style.windowHeight,
    layout: 'fit',

    initComponent: function () {
        if (window.innerWidth < Geontrack.Style.windowWidth || window.innerHeight < Geontrack.Style.windowHeight) {
            this.maximized = true;
            this.style = 'border-width: 0';
        }
        this.callParent();
    }
});
