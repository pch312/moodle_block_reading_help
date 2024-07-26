<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Parametre du plugin
 *
 * @package     block_reading_help
 * @copyright   2024 Philippe CHATAIGNER
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die;

global $ADMIN , $CFG;

if ($ADMIN->fulltree) {
    $settings->add(new admin_setting_configtext('block_reading_help/name',
        new lang_string('name' , 'block_reading_help'),
        new lang_string('name_desc' , 'block_reading_help') , '' , PARAM_RAW));

}
