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
 * Fichier libraire
 *
 * @package     block_reading_help
 * @copyright   2024 Philippe CHATAIGNER
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * ajout du javascript avant l entete
 */
function block_reading_help_before_footer() {
    global $PAGE;
    $PAGE->requires->js('/blocks/reading_help/js/reading_help.js');
}
/**
 * block_reading_help_render_navbar_output
 * @return string
 */
function block_reading_help_render_navbar_output() {
    global $SESSION, $USER, $CFG;
    if (isset($SESSION->lang)) {
        $lang = $SESSION->lang;
    } else {
        if (isset($USER->lang)) {
            $lang = $USER->lang;
        } else {
            $lang = $CFG->lang;
        }
    }
    return '<span id="reading_help-text-escape" data-code="'.get_string('reading_help_text_escape', 'block_reading_help').'">'.
        '</span><span id="reading_help-lang" data-code="'.$lang.'"></span>';
}


