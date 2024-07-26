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
 * Corps du bloc
 *
 * @package     block_reading_help
 * @copyright   2024 Philippe CHATAIGNER
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Class bloc reading_help
 * @author philippe
 *
 */
class block_reading_help extends block_base {

    /**
     * Init bloc
     */
    public function init() {
        $this->title = get_string('assistance', 'block_reading_help');
    }

    /**
     * has_config
     * {@inheritDoc}
     * @see block_base::has_config()
     */
    public function has_config() {
        return true;
    }

    /**
     * Content of the bloc
     * {@inheritDoc}
     * @see block_base::get_content()
     */
    public function get_content() {
        if ($this->content !== null) {
            return $this->content;
        }
        global $USER, $CFG, $DB;

        require_once($CFG->dirroot . '/user/profile/lib.php');

        $myuser = $DB->get_record('user', ['id' => $USER->id]);
        if ( ! $myuser) {
            return;
        }
        profile_load_data($myuser);
        $this->content         = new stdClass;
        $this->title = get_config('block_assistance' , 'name');
        if ( ! $this->title) {
            $this->title = get_string('assistance' , 'block_reading_help');
        }

        $this->content->text  = '<table style="width:100%">';
        $this->content->text  .= '<tr>';
        $this->content->text  .= '<td valign="center" style="text-align: center">';
        $this->content->text  .= '    <button class="btn btn-primary" name="block_reading_help_Synthesis" ';
        $this->content->text  .= 'onclick="block_reading_help_speechsynthesis(this)">'.
            get_string('synthesis', 'block_reading_help').'</button>';
        $this->content->text  .= '</td>';
        $this->content->text  .= '<td valign="center" style="text-align: center">';
        $this->content->text  .= '    <button class="btn btn-primary" name="block_reading_help_MaskTexte" ';
        $this->content->text  .= 'onclick="block_reading_help_openmask()">'.get_string('mask', 'block_reading_help').'</button>';
        $this->content->text  .= '</td>';
        $this->content->text  .= '</tr>';
        $this->content->text  .= '<tr>';
        $this->content->text  .= '<td style="text-align: left" colspan="2">';
        $this->content->text  .= '<i class="fa fa-question-circle" aria-hidden="true"></i> '.
            get_string('synthesis_help', 'block_reading_help');
        $this->content->text  .= '</td>';
        $this->content->text  .= '</tr>';
        $this->content->text  .= '</table>';
        if ($this->content !== null) {
            return $this->content;
        }

    }

    /**
     * hide header
     * {@inheritDoc}
     * @see block_base::hide_header()
     */
    public function hide_header() {
        return false;
    }

    /**
     * Specific défintion
     * @param moodleform $mform
     */
    protected function specific_definition($mform) {

        // Section header title according to language file.
        $mform->addElement('header', 'config_header', get_string('blocksettings', 'block'));

        // A sample string variable with a default value.
        $mform->addElement('text', 'config_text', get_string('blockstring', 'block_reading_help'));
        $mform->setDefault('config_text', 'default value');
        $mform->setType('config_text', PARAM_RAW);
    }

    /**
     * specialization
     * {@inheritDoc}
     * @see block_base::specialization()
     */
    public function specialization() {
        if (isset($this->config)) {
            if (empty($this->config->title)) {
                $this->title = get_string('defaulttitle', 'block_reading_help');
            } else {
                $this->title = $this->config->title;
            }

            if (empty($this->config->text)) {
                $this->config->text = get_string('defaulttext', 'block_reading_help');
            }
        }
    }
}
